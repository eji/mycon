import { Record } from 'immutable';
import Unpersisted from '../../types/unpersisted';

type UserProps = {
  id: string;
  email: string;
};

export default interface User extends UserProps {
  equals(other: User): boolean;
}

export type UnpersistedUser = Unpersisted<User>;

class UserClass extends Record<Omit<UserProps, 'id'> & { id?: string }>({
  id: undefined,
  email: '',
}) {
  equals(other: User): boolean {
    return this.id === other.id;
  }
}

export function makeUser(props: { email: string }): UnpersistedUser;
export function makeUser(props: { id: string; email: string }): User;
export function makeUser(props: { id?: string; email: string }): unknown {
  return new UserClass(props);
}
