import * as TE from 'fp-ts/lib/TaskEither';
import * as F from 'fp-ts/lib/function';
import { pipe } from 'fp-ts/lib/pipeable';
import * as restm from 'typed-rest-client/RestClient';
import HttpError from '../errors/httpError';
import NotFoundError from '../errors/repositoryErrors/queryErrors/notFoundError';
import InvalidResponseError from '../errors/httpErrors/invalidResponseError';
import BaseError from '../errors/baseError';

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

const makeHttpError = (reason: unknown): HttpError => {
  if (isRestmClientError(reason)) {
    return new HttpError(reason.statusCode, { message: reason.message });
  }
  return new InvalidResponseError();
};

export default class RestClient {
  constructor(readonly client: restm.RestClient, readonly basePath: string) {}

  all = <T>(): TE.TaskEither<BaseError, T> =>
    this.sendRequest(() => this.client.get<T>(`${this.basePath}`));

  show = <T>(id: string): TE.TaskEither<BaseError, T> =>
    this.sendRequest(() => this.client.get<T>(`${this.basePath}/${id}`));

  create = <T, U>(resource: T): TE.TaskEither<BaseError, U> =>
    this.sendRequest(() => this.client.create<U>(`${this.basePath}`, resource));

  replace = <T extends { id: string }, U>(
    resource: T
  ): TE.TaskEither<BaseError, U> =>
    this.sendRequest(() =>
      this.client.replace<U>(`${this.basePath}/${resource.id}`, resource)
    );

  delete = <T extends { id: string }, U>(
    resource: T
  ): TE.TaskEither<BaseError, U> =>
    this.sendRequest(() =>
      this.client.del<U>(`${this.basePath}/${resource.id}`)
    );

  private sendRequest = <T>(
    fetchFunc: F.Lazy<Promise<restm.IRestResponse<T>>>
  ): TE.TaskEither<BaseError, T> => {
    return pipe(
      TE.tryCatch(fetchFunc, makeHttpError),
      TE.chain((res) =>
        res.result == null || res.statusCode === 404
          ? TE.left(new NotFoundError())
          : TE.right(res.result)
      )
    );
  };
}
