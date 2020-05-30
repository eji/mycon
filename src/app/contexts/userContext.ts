import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import User from '../../domain/models/user';
import BaseError from '../../errors/baseError';
import NotFoundError from '../../errors/repositoryErrors/queryErrors/notFoundError';

interface UserContextData {
  currentUser: O.Option<User>;
  currentFirebaseUser: O.Option<firebase.User>;
}

const userContextData: UserContextData = {
  currentUser: O.none,
  currentFirebaseUser: O.none,
};

const getCurrentUser = (): O.Option<User> => userContextData.currentUser;

const setCurrentUser = (user: User): User => {
  userContextData.currentUser = O.some(user);
  return user;
};

const clear = (): void => {
  userContextData.currentUser = O.none;
  userContextData.currentFirebaseUser = O.none;
};

const setCurrentFirebaseUser = (user: firebase.User): firebase.User => {
  userContextData.currentFirebaseUser = O.some(user);
  return user;
};

const getIdToken = (): TE.TaskEither<BaseError, string> =>
  pipe(
    userContextData.currentFirebaseUser,
    // TODO: 直すこと
    TE.fromOption(() => new NotFoundError()),
    TE.chain((user) =>
      TE.tryCatch(
        () => user.getIdToken(),
        () => new NotFoundError()
      )
    )
  );

export interface UserContext {
  readonly getCurrentUser: typeof getCurrentUser;
  readonly getIdToken: typeof getIdToken;
  readonly setCurrentUser: typeof setCurrentUser;
  readonly setCurrentFirebaseUser: typeof setCurrentFirebaseUser;
  readonly clear: typeof clear;
}

const userContext: UserContext = {
  getCurrentUser,
  getIdToken,
  setCurrentUser,
  setCurrentFirebaseUser,
  clear,
};

export default userContext;
