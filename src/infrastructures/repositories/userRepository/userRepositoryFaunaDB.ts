import * as TE from 'fp-ts/lib/TaskEither';
import gql from 'graphql-tag';
import { pipe } from 'fp-ts/lib/pipeable';
import UserRepository from '../../../domain/repositories/userRepository';
import AppError from '../../../errors/AppError';
import User, { UnpersistedUser } from '../../../domain/models/user';
import UserResponse, {
  buildUserFromUserReponse,
} from './userRepositoryFaunaDB/userResponse';
import FaunaDBGraphQLClient from '../../../drivers/faunaDBGraphQLClient';
import { GraphQLIDTable } from '../../../utils/graphQLIDTable';
import inspect from '../../../utils/taskEitherHelpers';
import { genId } from '../../../domain/models/id';

const findByEmailQuery = gql`
  query findUserByEmail($email: String!) {
    findByEmail(email: $email) {
      _id
      name
      email
    }
  }
`;

const createUserMutation = gql`
  query CrateUser($input: UserInput!) {
    createUser(data: $input) {
      _id
      name
      email
    }
  }
`;

export default class UserRepositoryFaunaDB implements UserRepository {
  constructor(
    readonly client: FaunaDBGraphQLClient,
    readonly graphqlIDTable: GraphQLIDTable
  ) {}

  getCurrentUser = (): TE.TaskEither<AppError, User> => {
    throw new Error("Don't use");
  };

  findByEmail = (email: string): TE.TaskEither<AppError, User> =>
    pipe(
      this.client.query<UserResponse>({
        query: findByEmailQuery,
        variables: {
          email,
        },
      }),
      TE.map(
        // eslint-disable-next-line no-underscore-dangle
        inspect((result) => this.graphqlIDTable.set(result.userID, result._id))
      ),
      TE.map(buildUserFromUserReponse)
    );

  create = (user: UnpersistedUser): TE.TaskEither<AppError, User> =>
    pipe(
      this.client.mutate<UserResponse>({
        mutation: createUserMutation,
        variables: {
          userID: genId(),
          email: user.email,
        },
      }),
      TE.map(
        // eslint-disable-next-line no-underscore-dangle
        inspect((result) => this.graphqlIDTable.set(result.userID, result._id))
      ),
      TE.map(buildUserFromUserReponse)
    );
}
