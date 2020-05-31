import * as O from 'fp-ts/lib/Option';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import User from '../../domain/models/user';
import AppError from '../../errors/AppError';

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

const getIdToken = (): TE.TaskEither<AppError, string> =>
  pipe(
    userContextData.currentFirebaseUser,
    // TODO: 直すこと
    TE.fromOption(() => new AppError('user_context/firebase_user_not_exists')),
    TE.chain((user) =>
      TE.tryCatch(
        () => user.getIdToken(),
        (e) => {
          console.error(e);
          return new AppError('firebase/failed_to_get_id_token');
        }
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
