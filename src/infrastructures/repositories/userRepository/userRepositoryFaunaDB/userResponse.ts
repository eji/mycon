import User, { makeUser } from '../../../../domain/models/user';

export interface UserFoundResponse {
  readonly data: {
    readonly _id: number;
    readonly userID: string;
    readonly email: string;
  };
}

export interface UserNotFoundResponse {
  readonly data: null;
}

type UserResponse = UserFoundResponse | UserNotFoundResponse;
export default UserResponse;

export const isUserFoundResponse = (
  res: UserResponse
): res is UserFoundResponse => res.data !== null;

export const buildUserFromUserFoundReponse = (
  response: UserFoundResponse
): User =>
  makeUser({
    id: response.data.userID,
    email: response.data.email,
  });
