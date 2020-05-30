import User, { makeUser } from '../../../../domain/models/user';

export type UserResponseValue = {
  id: string;
  email: string;
};

type UserResponse = {
  user: UserResponseValue;
};

export default UserResponse;

export const isUserResponseValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is UserResponseValue => {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  const { id, email } = value;
  return typeof id === 'string' && typeof email === 'string';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isUserResponse = (value: any): value is UserResponse => {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  return isUserResponseValue(value.appUser);
};

export const userFromResponseValue = (value: UserResponseValue): User => {
  const { id, email } = value;
  return makeUser({
    id,
    email,
  });
};

export const userFromResponse = (response: UserResponse): User =>
  userFromResponseValue(response.user);

export const responseValueFromUser = (user: User): UserResponseValue => ({
  id: user.id,
  email: user.email,
});
