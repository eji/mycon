import * as TE from 'fp-ts/lib/TaskEither';
import NotFoundError from '../../../errors/repositoryErrors/queryErrors/notFoundError';
import BaseError from '../../../errors/baseError';
import InMemoryStore from '../../../drivers/inMemoryStore';
import UserRepository from '../../../domain/repositories/userRepository';
import User, { UnpersistedUser, makeUser } from '../../../domain/models/user';
import userContext from '../../../app/contexts/userContext';
import { genId } from '../../../domain/models/id';

export default class UserRepositoryInMemory implements UserRepository {
  readonly store: InMemoryStore<string, User>;

  constructor(store?: InMemoryStore<string, User>) {
    this.store = store || new InMemoryStore<string, User>();
  }

  getCurrentUser = (): TE.TaskEither<BaseError, User> =>
    TE.fromOption(() => new NotFoundError())(userContext.getCurrentUser());

  findByEmail = (email: string): TE.TaskEither<BaseError, User> =>
    TE.fromOption(() => new NotFoundError())(this.store.get(email));

  create = (user: UnpersistedUser): TE.TaskEither<BaseError, User> => {
    const newUser = makeUser({
      id: genId(),
      email: user.email,
    });
    this.store.set(newUser.id, newUser);
    return TE.right(newUser);
  };
}
