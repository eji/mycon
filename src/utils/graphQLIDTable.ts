import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import AppError from '../errors/AppError';
import { UserContext } from '../app/contexts/userContext';

export type GraphQLID = string;

interface GraphQLIDMap {
  [key: string]: GraphQLID;
}

const graphQLIDMap: GraphQLIDMap = {};

const get = (domainModelID: string): E.Either<AppError, GraphQLID> => {
  const id: GraphQLID | undefined = graphQLIDMap[domainModelID];
  if (id == null) {
    return E.left(new AppError('graphql/id_not_found_error'));
  }
  return E.right(id);
};

const set = (domainModelID: string, graphQLModelID: string | number): void => {
  graphQLIDMap[domainModelID] = graphQLModelID.toString();
};

const getGraphQLUserID = (
  userContext: UserContext
): E.Either<AppError, GraphQLID> =>
  pipe(
    userContext.getCurrentUser(),
    E.fromOption(() => new AppError('user_context/current_user_not_exists')),
    E.chain((user) => get(user.id))
  );

export type GraphQLIDTable = {
  readonly get: typeof get;
  readonly set: typeof set;
  readonly getGraphQLUserID: typeof getGraphQLUserID;
};

const graphQLIDTable: GraphQLIDTable = {
  get,
  set,
  getGraphQLUserID,
};

export default graphQLIDTable;
