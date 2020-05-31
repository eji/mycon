import * as TE from 'fp-ts/lib/TaskEither';
import User, { UnpersistedUser } from '../models/user';
import AppError from '../../errors/AppError';

export default interface UserRepository {
  getCurrentUser: () => TE.TaskEither<AppError, User>;
  findByEmail: (email: string) => TE.TaskEither<AppError, User>;
  create: (user: UnpersistedUser) => TE.TaskEither<AppError, User>;
}
