import * as TE from 'fp-ts/lib/TaskEither';
import BaseError from '../../errors/baseError';
import User, { UnpersistedUser } from '../models/user';

export default interface UserRepository {
  getCurrentUser: () => TE.TaskEither<BaseError, User>;
  findByEmail: (email: string) => TE.TaskEither<BaseError, User>;
  create: (user: UnpersistedUser) => TE.TaskEither<BaseError, User>;
}
