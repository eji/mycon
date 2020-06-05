import { ApolloClient, NetworkStatus, OperationVariables } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { DocumentNode } from 'graphql';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import AppError from '../errors/AppError';

export default class FaunaDBGraphQLClient {
  constructor(readonly client: ApolloClient<NormalizedCacheObject>) {}

  query = <T>(params: {
    query: DocumentNode;
    variables?: OperationVariables;
  }): TE.TaskEither<AppError, T> => {
    const { query, variables } = params;
    return pipe(
      () => this.client.query<T>({ query, variables }),
      TE.rightTask,
      TE.chainEitherK((res) => {
        if (res.networkStatus !== NetworkStatus.ready) {
          // TODO: 直すこと
          console.error(res.networkStatus);
          return E.left(new AppError('graphql/network_error'));
        }

        if (res.errors != null) {
          // TODO: 直すこと
          console.error(res.errors.toString());
          return E.left(new AppError('graphql/graphql_error'));
        }
        return E.right(res.data);
      })
    );
  };

  mutate = <T>(params: {
    mutation: DocumentNode;
    variables?: OperationVariables;
  }): TE.TaskEither<AppError, T> => {
    const { mutation, variables } = params;
    return pipe(
      () =>
        this.client.mutate<T>({
          mutation,
          variables,
        }),
      TE.rightTask,
      TE.chainEitherK(
        (res): E.Either<AppError, T> => {
          if (res.errors != null) {
            // TODO: 直すこと
            console.error(res.errors.toString());
            return E.left(new AppError('graphql/graphql_error'));
          }

          if (res.data == null) {
            return E.left(new AppError('graphql/no_response'));
          }

          return E.right(res.data);
        }
      )
    );
  };
}
