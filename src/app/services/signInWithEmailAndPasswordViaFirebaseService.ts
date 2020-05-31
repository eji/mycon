import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import RestClient from '../../drivers/restClient';
import { UserContext } from '../contexts/userContext';
import SignedInResponse, {
  userFromSignedInResponse,
} from '../../api/handlers/signedIn/responses/signedInResponse';
import { SignedInRequest } from '../../api/handlers/signedIn/requests/signedInRequest';
import User from '../../domain/models/user';
import AppError from '../../errors/AppError';

type Params = {
  email: string;
  password: string;
};

export default class SignInWithEmailAndPasswordViaFirebaseService {
  constructor(
    readonly firebaseAuth: firebase.auth.Auth,
    readonly restClient: RestClient,
    readonly userContext: UserContext
  ) {}

  execute = (params: Params): TE.TaskEither<AppError, User> => {
    const { email, password } = params;
    return pipe(
      this.signIn(email, password),
      TE.chainEitherK(this.getFirebaseUserFromUserCredential),
      TE.chain((firebaseUser) =>
        pipe(
          this.getIdTokenFromFirebaseUser(firebaseUser),
          TE.chain(this.sendSignedInRequest),
          TE.map((user) => {
            this.userContext.setCurrentUser(user);
            this.userContext.setCurrentFirebaseUser(firebaseUser);
            return user;
          })
        )
      )
    );
  };

  private signIn = (
    email: string,
    password: string
  ): TE.TaskEither<AppError, firebase.auth.UserCredential> => {
    return TE.tryCatch(
      (): Promise<firebase.auth.UserCredential> =>
        this.firebaseAuth.signInWithEmailAndPassword(email, password),
      // TODO: 認証エラーに直すこと
      (e) => {
        console.error(e);
        return new AppError('auth/failed_sign_in');
      }
    );
  };

  private getFirebaseUserFromUserCredential = (
    credential: firebase.auth.UserCredential
  ): E.Either<AppError, firebase.User> => {
    if (credential.user === null) {
      return E.left(
        new AppError('firebase/user_not_exists_in_user_credential')
      );
    }
    return E.right(credential.user);
  };

  private getIdTokenFromFirebaseUser = (
    user: firebase.User
  ): TE.TaskEither<AppError, string> => {
    return pipe(
      TE.tryCatch(
        () => user.getIdToken(),
        (e) => {
          console.log(e);
          return new AppError('firebase/failed_to_get_id_token');
        }
      )
    );
  };

  private sendSignedInRequest = (
    idToken: string
  ): TE.TaskEither<AppError, User> => {
    return pipe(
      this.restClient.create<SignedInRequest, SignedInResponse>({
        idToken,
      }),
      TE.map(userFromSignedInResponse)
    );
  };
}
