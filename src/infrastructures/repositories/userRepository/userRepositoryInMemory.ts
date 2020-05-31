import * as TE from 'fp-ts/lib/TaskEither';
import InMemoryStore from '../../../drivers/inMemoryStore';
import UserRepository from '../../../domain/repositories/userRepository';
import User, { UnpersistedUser, makeUser } from '../../../domain/models/user';
import userContext from '../../../app/contexts/userContext';
import { genId } from '../../../domain/models/id';
import AppError from '../../../errors/AppError';

export default class UserRepositoryInMemory implements UserRepository {
  readonly store: InMemoryStore<string, User>;

  constructor(store?: InMemoryStore<string, User>) {
    this.store = store || new InMemoryStore<string, User>();
  }

  getCurrentUser = (): TE.TaskEither<AppError, User> =>
    TE.fromOption(() => new AppError('repos/not_found_error'))(
      userContext.getCurrentUser()
    );

  findByEmail = (email: string): TE.TaskEither<AppError, User> =>
    TE.fromOption(() => new AppError('repos/not_found_error'))(
      this.store.get(email)
    );

  create = (user: UnpersistedUser): TE.TaskEither<AppError, User> => {
    const newUser = makeUser({
      id: genId(),
      email: user.email,
    });
    this.store.set(newUser.id, newUser);
    return TE.right(newUser);
  };
}
