import * as E from 'fp-ts/lib/Either';
import AppError from '../errors/AppError';

export type GraphQLID = string;

interface GraphQLIDMap {
  [key: string]: GraphQLID;
}

const graphQLIDMap: GraphQLIDMap = {};

const get = (domainModelID: string): E.Either<AppError, GraphQLID> => {
  const id: GraphQLID | undefined = graphQLIDMap[domainModelID];
  return id == null
    ? E.left(new AppError('graphql/id_not_found_error'))
    : E.right(id);
};

const set = (domainModelID: string, graphQLModelID: string | number): void => {
  graphQLIDMap[domainModelID] = graphQLModelID.toString();
};

export type GraphQLIDTable = {
  readonly get: typeof get;
  readonly set: typeof set;
};

const graphQLIDTable: GraphQLIDTable = {
  get,
  set,
};

export default graphQLIDTable;
