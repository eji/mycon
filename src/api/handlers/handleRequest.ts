/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-namespace */
import { NowResponse, NowRequest } from '@now/node';
import * as E from 'fp-ts/lib/Either';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import NotImplementedError from '../../errors/requestErrors/serverErrors/notImplementedError';
import { makeErrorResponse } from '../responses/errorResponse';
import BaseError from '../../errors/baseError';
import ApiResponse from '../apiResponse';
import * as ErrorTracker from '../../utils/errorTracker';

/**
 * for Sentry
 *
 * This allows TypeScript to detect our global value
 */
declare global {
  namespace NodeJS {
    interface Global {
      __rootdir__: string;
    }
  }
}
global.__rootdir__ = __dirname || process.cwd();

ErrorTracker.initErrorTracker();

export type ApiHandler = (
  request: NowRequest
) => TE.TaskEither<BaseError, ApiResponse>;

type Handlers = {
  get?: ApiHandler;
  post?: ApiHandler;
  put?: ApiHandler;
  delete?: ApiHandler;
};

const selectHandler = (
  httpMethod: string | undefined,
  handlers: Handlers
): ApiHandler | null => {
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

const makeErrorHandler = (response: NowResponse): ((error: Error) => Error) => {
  return (error: Error): Error => {
    const res = makeErrorResponse(error);
    response.status(200).send(res);
    return error;
  };
};

const handleRequest = (
  handlers: Handlers
): ((request: NowRequest, response: NowResponse) => Promise<void>) => {
  return async (request: NowRequest, response: NowResponse): Promise<void> => {
    const handleError = makeErrorHandler(response);
    try {
      await pipe(
        selectHandler(request.method, handlers),
        E.fromNullable(new NotImplementedError()),
        TE.fromEither,
        TE.chain((handler) => handler(request)),
        TE.map(response.status(200).send),
        TE.mapLeft(handleError)
      )();
    } catch (error) {
      ErrorTracker.captureException(error);
      handleError(error);
    }
    await ErrorTracker.flush();
  };
};

export default handleRequest;
