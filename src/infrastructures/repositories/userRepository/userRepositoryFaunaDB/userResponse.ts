import User, { makeUser } from '../../../../domain/models/user';

export interface UserFoundResponse {
  readonly findUserByEmail: {
    readonly _id: number;
    readonly userID: string;
    readonly email: string;
  };
}

export interface UserNotFoundResponse {
  readonly findUserByEmail: null;
}

type UserResponse = UserFoundResponse | UserNotFoundResponse;
export default UserResponse;

export const isUserFoundResponse = (
  res: UserResponse
): res is UserFoundResponse => res.findUserByEmail !== null;

export const buildUserFromUserFoundReponse = (
  response: UserFoundResponse
): User =>
  makeUser({
    id: response.findUserByEmail.userID,
    email: response.findUserByEmail.email,
  });
