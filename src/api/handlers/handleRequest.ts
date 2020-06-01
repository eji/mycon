/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-namespace */
import { NowResponse, NowRequest } from '@now/node';
import * as E from 'fp-ts/lib/Either';
import * as F from 'fp-ts/lib/Foldable';
import * as TE from 'fp-ts/lib/TaskEither';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import { makeErrorResponse } from '../responses/errorResponse';
import ApiResponse from '../apiResponse';
import * as ErrorTracker from '../../utils/errorTrackerForServer';
import inspect from '../../utils/taskEitherHelpers';
import AppError from '../../errors/AppError';

// /**
//  * for Sentry
//  *
//  * This allows TypeScript to detect our global value
//  */
// declare global {
//   namespace NodeJS {
//     interface Global {
//       __rootdir__: string;
//     }
//   }
// }
// global.__rootdir__ = __dirname || process.cwd();

ErrorTracker.initErrorTracker();

export type ApiHandler = (
  request: NowRequest
) => TE.TaskEither<AppError, ApiResponse>;

export type BeforeAction = (
  request: NowRequest
) => TE.TaskEither<AppError, NowRequest>;

export type BeforeActions = BeforeAction[];

type HandlerValue = { handler: ApiHandler; beforeActions?: BeforeActions };

type Handlers = {
  get?: HandlerValue;
  post?: HandlerValue;
  put?: HandlerValue;
  delete?: HandlerValue;
};

const selectHandlerValue = (
  httpMethod: string | undefined,
  handlers: Handlers
): HandlerValue | null => {
  switch (httpMethod) {
    case 'GET':
      return handlers.get || null;
    case 'POST':
      return handlers.post || null;
    case 'PUT':
      return handlers.put || null;
    case 'DELETE':
      return handlers.delete || null;
    default:
      return null;
  }
};

const getBeforeActions = (
  httpMethod: string | undefined,
  handlers: Handlers
): BeforeAction[] => {
  const handlerValue = selectHandlerValue(httpMethod, handlers);
  return handlerValue?.beforeActions || [];
};

const selectHandler = (
  httpMethod: string | undefined,
  handlers: Handlers
): ApiHandler | null => {
  const handlerValue = selectHandlerValue(httpMethod, handlers);
  return handlerValue?.handler || null;
};

const makeErrorHandler = (response: NowResponse): ((error: Error) => Error) => {
  return (error: Error): Error => {
    const res = makeErrorResponse(error);
    response.status(200).send(res);
    return error;
  };
};

const executeBeforeActions = (
  handlers: Handlers,
  request: NowRequest
): TE.TaskEither<AppError, NowRequest> => {
  const beforeActions = getBeforeActions(request.method, handlers);
  return F.foldM(TE.taskEither, A.array)(
    beforeActions,
    request,
    (req, action) => action(req)
  );
};

const handleRequest = (
  handlers: Handlers
): ((request: NowRequest, response: NowResponse) => Promise<void>) => {
  return async (request: NowRequest, response: NowResponse): Promise<void> => {
    const handleError = makeErrorHandler(response);
    try {
      await pipe(
        executeBeforeActions(handlers, request),
        TE.chain((req) =>
          pipe(
            selectHandler(req.method, handlers),
            E.fromNullable(new AppError('http_req/not_implemented_error')),
            TE.fromEither,
            TE.chain((handler) => handler(req)),
            TE.map(response.status(200).send)
          )
        ),
        TE.mapLeft(handleError),
        TE.mapLeft(inspect(ErrorTracker.captureException))
      )();
    } catch (error) {
      ErrorTracker.captureException(error);
      handleError(error);
    }
    await ErrorTracker.flush();
  };
};

export default handleRequest;
