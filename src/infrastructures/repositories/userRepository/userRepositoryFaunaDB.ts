import * as TE from 'fp-ts/lib/TaskEither';
import gql from 'graphql-tag';
import { pipe } from 'fp-ts/lib/pipeable';
import UserRepository from '../../../domain/repositories/userRepository';
import AppError from '../../../errors/AppError';
import User, { UnpersistedUser } from '../../../domain/models/user';
import UserResponse, {
  isUserFoundResponse,
  buildUserFromUserFoundReponse,
  UserFoundResponse,
} from './userRepositoryFaunaDB/userResponse';
import FaunaDBGraphQLClient from '../../../drivers/faunaDBGraphQLClient';
import { GraphQLIDTable } from '../../../utils/graphQLIDTable';
import inspect from '../../../utils/taskEitherHelpers';
import { genId } from '../../../domain/models/id';

const findByEmailQuery = gql`
  query findUserByEmail($email: String!) {
    findUserByEmail(email: $email) {
      _id
      email
    }
  }
`;

const createUserMutation = gql`
  mutation CrateUser($input: UserInput!) {
    createUser(data: $input) {
      _id
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
      TE.map(inspect(console.log)),
      TE.filterOrElse(
        isUserFoundResponse,
        () => new AppError('repos/not_found_error')
      ),
      TE.map(inspect(this.registerGraphQLIDAndDomainModelID)),
      TE.map(buildUserFromUserFoundReponse)
    );

  create = (user: UnpersistedUser): TE.TaskEither<AppError, User> =>
    pipe(
      this.client.mutate<UserFoundResponse>({
        mutation: createUserMutation,
        variables: {
          userID: genId(),
          email: user.email,
        },
      }),
      TE.map(inspect(this.registerGraphQLIDAndDomainModelID)),
      TE.map(buildUserFromUserFoundReponse)
    );

  private registerGraphQLIDAndDomainModelID = (
    response: UserFoundResponse
  ): void => {
    this.graphqlIDTable.set(
      response.findUserByEmail.userID,
      // eslint-disable-next-line no-underscore-dangle
      response.findUserByEmail._id
    );
  };
}
