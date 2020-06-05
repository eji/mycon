import User, { makeUser } from '../../../../domain/models/user';

export default interface CreateUserResponse {
  readonly createUser: {
    readonly _id: number;
    readonly userID: string;
    readonly email: string;
  };
}

export const buildUserFromCreateUserResponse = (
  response: CreateUserResponse
): User =>
  makeUser({
    id: response.createUser.userID,
    email: response.createUser.email,
  });
