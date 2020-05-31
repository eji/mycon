import * as TE from 'fp-ts/lib/TaskEither';
import * as F from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import * as restm from 'typed-rest-client/RestClient';
import { isErrorResponse } from '../api/responses/errorResponse';
import AppError from '../errors/AppError';

type RestmClientError = Error & { statusCode: number };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRestmClientError = (reason: any): reason is RestmClientError => {
  if (
    typeof reason === 'object' &&
    reason !== null &&
    'statusCode' in reason &&
    'message' in reason
  ) {
    const { statusCode, message } = reason;
    return typeof statusCode === 'number' && typeof message === 'string';
  }
  return false;
};

const makeHttpError = (reason: unknown): AppError => {
  if (isRestmClientError(reason)) {
    // return new HttpError(reason.statusCode, { message: reason.message });
    console.error({ statusCode: reason.statusCode, message: reason.message });
    return new AppError('http_req/error_received');
  }
  return new AppError('http_req/invalid_response_error');
};

export default class RestClient {
  constructor(readonly client: restm.RestClient, readonly basePath: string) {}

  all = <T>(): TE.TaskEither<AppError, T> =>
    this.sendRequest(() => this.client.get<T>(`${this.basePath}`));

  show = <T>(id: string): TE.TaskEither<AppError, T> =>
    this.sendRequest(() => this.client.get<T>(`${this.basePath}/${id}`));

  create = <T, U>(resource: T): TE.TaskEither<AppError, U> =>
    this.sendRequest(() => this.client.create<U>(`${this.basePath}`, resource));

  replace = <T extends { id: string }, U>(
    resource: T
  ): TE.TaskEither<AppError, U> =>
    this.sendRequest(() =>
      this.client.replace<U>(`${this.basePath}/${resource.id}`, resource)
    );

  delete = <T extends { id: string }, U>(
    resource: T
  ): TE.TaskEither<AppError, U> =>
    this.sendRequest(() =>
      this.client.del<U>(`${this.basePath}/${resource.id}`)
    );

  private sendRequest = <T>(
    fetchFunc: F.Lazy<Promise<restm.IRestResponse<T>>>
  ): TE.TaskEither<AppError, T> => {
    return pipe(
      TE.tryCatch(fetchFunc, makeHttpError),
      TE.chain(
        (res): TE.TaskEither<AppError, T> => {
          if (res.statusCode === 404) {
            return TE.left(new AppError('http_req/404_error'));
          }

          if (res.result == null) {
            return TE.left(
              new AppError('http_req/empty_response_body_received')
            );
          }
          return TE.right(res.result);
        }
      ),
      TE.chain((res) => {
        if (isErrorResponse(res)) {
          return TE.left(new AppError(res.error.errorCode));
        }
        return TE.right(res);
      })
    );
  };
}
