import User, { makeUser } from '../../../../domain/models/user';

export default interface UserResponse {
  readonly _id: number;
  readonly userID: string;
  readonly email: string;
}

export const buildUserFromUserReponse = (response: UserResponse): User =>
  makeUser({
    id: response.userID,
    email: response.email,
  });
