import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import User, { makeUser } from '../../domain/models/user';
import UserRepository from '../../domain/repositories/userRepository';
import { FirebaseIdTokenUtil } from '../../utils/firebaseIdTokenUtil';
import AppError from '../../errors/AppError';

type Params = {
  idToken: string;
};

/**
 * サインイン成功後の処理をするサービス
 */
export default class SignedInService {
  constructor(
    readonly firebaseIdTokenUtil: FirebaseIdTokenUtil,
    readonly userRepository: UserRepository
  ) {}

  execute = (params: Params): TE.TaskEither<AppError, User> =>
    pipe(
      this.firebaseIdTokenUtil.verifyIdTokenAndGetEmail(params.idToken),
      TE.chain(this.findOrCreateUser)
    );

  private findOrCreateUser = (email: string): TE.TaskEither<AppError, User> =>
    pipe(
      this.userRepository.findByEmail(email),
      TE.orElse((e) => {
        if (e.errorCode === 'repos/not_found_error') {
          const newUser = makeUser({ email });
          return this.userRepository.create(newUser);
        }
        return TE.left(e);
      })
    );
}
