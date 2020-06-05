import * as E from 'fp-ts/lib/Either';
import AppError from '../errors/AppError';

interface GraphQLIDMap {
  [key: string]: number;
}

const graphQLIDMap: GraphQLIDMap = {};

const get = (domainModelID: string): E.Either<AppError, number> => {
  const id: number | undefined = graphQLIDMap[domainModelID];
  return id == null
    ? E.left(new AppError('graphql/id_not_found_error'))
    : E.right(id);
};

const set = (domainModelID: string, graphQLModelID: number): void => {
  graphQLIDMap[domainModelID] = graphQLModelID;
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
