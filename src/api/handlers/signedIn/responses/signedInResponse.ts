import User from '../../../../domain/models/user';
import {
  UserResponseValue,
  isUserResponseValue,
  userFromResponseValue,
  responseValueFromUser,
} from '../../users/responses/userResponse';

export type SignedInResponseValue = {
  user: UserResponseValue;
};

type SignedInResponse = {
  signedIn: SignedInResponseValue;
};

export default SignedInResponse;

export const isSignedInResponseValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is SignedInResponseValue => {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  const { user } = value;
  return isUserResponseValue(user);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSignedInResponse = (value: any): value is SignedInResponse => {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  return isSignedInResponseValue(value.signedIn);
};

export const userFromSignedInResponseValue = (
  value: SignedInResponseValue
): User => userFromResponseValue(value.user);

export const userFromSignedInResponse = (response: SignedInResponse): User =>
  userFromSignedInResponseValue(response.signedIn);

export const signedInResponseValuleFromUser = (
  user: User
): SignedInResponseValue => ({
  user: responseValueFromUser(user),
});

export const signedInResponseFromUser = (user: User): SignedInResponse => ({
  signedIn: signedInResponseValuleFromUser(user),
});
