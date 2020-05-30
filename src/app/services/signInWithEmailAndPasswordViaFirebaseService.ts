import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import BaseError from '../../errors/baseError';
import NotFoundError from '../../errors/repositoryErrors/queryErrors/notFoundError';
import RestClient from '../../drivers/restClient';
import { UserContext } from '../contexts/userContext';
import SignedInResponse, {
  userFromSignedInResponse,
} from '../../api/handlers/signedIn/responses/signedInResponse';
import { SignedInRequest } from '../../api/handlers/signedIn/requests/signedInRequest';
import User from '../../domain/models/user';

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

  execute = (params: Params): TE.TaskEither<BaseError, User> => {
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
  ): TE.TaskEither<BaseError, firebase.auth.UserCredential> => {
    return TE.tryCatch(
      (): Promise<firebase.auth.UserCredential> =>
        this.firebaseAuth.signInWithEmailAndPassword(email, password),
      // TODO: 認証エラーに直すこと
      (e) => {
        console.error(e);
        return new NotFoundError();
      }
    );
  };

  private getFirebaseUserFromUserCredential = (
    credential: firebase.auth.UserCredential
  ): E.Either<BaseError, firebase.User> => {
    if (credential.user === null) {
      // TODO: 直すこと
      return E.left(new NotFoundError());
    }
    return E.right(credential.user);
  };

  private getIdTokenFromFirebaseUser = (
    user: firebase.User
  ): TE.TaskEither<BaseError, string> => {
    return pipe(
      TE.tryCatch(
        () => user.getIdToken(),
        // TODO: 認証エラーに直すこと
        (e) => {
          console.log(e);
          return new NotFoundError();
        }
      )
    );
  };

  private sendSignedInRequest = (
    idToken: string
  ): TE.TaskEither<BaseError, User> => {
    return pipe(
      this.restClient.create<SignedInRequest, SignedInResponse>({
        idToken,
      }),
      TE.map(userFromSignedInResponse)
    );
  };
}
