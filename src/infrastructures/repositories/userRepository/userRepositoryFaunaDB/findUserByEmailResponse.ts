import User, { makeUser } from '../../../../domain/models/user';

export interface FoundUserByEmailResponse {
  readonly findUserByEmail: {
    readonly _id: number;
    readonly userID: string;
    readonly email: string;
  };
}

export interface NotFoundUserByEmailResponse {
  readonly findUserByEmail: null;
}

type FindUserByEmailResponse =
  | FoundUserByEmailResponse
  | NotFoundUserByEmailResponse;
export default FindUserByEmailResponse;

export const isFoundUserByEmailResponse = (
  res: FindUserByEmailResponse
): res is FoundUserByEmailResponse => res.findUserByEmail !== null;

export const buildUserFromUserFoundUserByEmailReponse = (
  response: FoundUserByEmailResponse
): User =>
  makeUser({
    id: response.findUserByEmail.userID,
    email: response.findUserByEmail.email,
  });
