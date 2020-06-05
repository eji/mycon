import * as TE from 'fp-ts/lib/TaskEither';
import gql from 'graphql-tag';
import { pipe } from 'fp-ts/lib/pipeable';
import UserRepository from '../../../domain/repositories/userRepository';
import AppError from '../../../errors/AppError';
import User, { UnpersistedUser } from '../../../domain/models/user';
import FindUserByEmailResponse, {
  isFoundUserByEmailResponse,
  buildUserFromUserFoundUserByEmailReponse,
} from './userRepositoryFaunaDB/findUserByEmailResponse';
import FaunaDBGraphQLClient from '../../../drivers/faunaDBGraphQLClient';
import { GraphQLIDTable } from '../../../utils/graphQLIDTable';
import inspect from '../../../utils/taskEitherHelpers';
import { genId } from '../../../domain/models/id';
import CreateUserResponse, {
  buildUserFromCreateUserResponse,
} from './userRepositoryFaunaDB/createUserResponse';

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
      this.client.query<FindUserByEmailResponse>({
        query: findByEmailQuery,
        variables: {
          email,
        },
      }),
      TE.map(inspect(console.log)),
      TE.filterOrElse(
        isFoundUserByEmailResponse,
        () => new AppError('repos/not_found_error')
      ),
      TE.map(
        inspect((res) =>
          this.graphqlIDTable.set(
            res.findUserByEmail.userID,
            // eslint-disable-next-line no-underscore-dangle
            res.findUserByEmail._id
          )
        )
      ),
      TE.map(buildUserFromUserFoundUserByEmailReponse)
    );

  create = (user: UnpersistedUser): TE.TaskEither<AppError, User> =>
    pipe(
      this.client.mutate<CreateUserResponse>({
        mutation: createUserMutation,
        variables: {
          input: {
            userID: genId(),
            email: user.email,
          },
        },
      }),
      TE.map(
        inspect((res) =>
          this.graphqlIDTable.set(
            res.createUser.userID,
            // eslint-disable-next-line no-underscore-dangle
            res.createUser._id
          )
        )
      ),
      TE.map(buildUserFromCreateUserResponse)
    );
}
