import { NowRequest } from '@now/node';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import { container } from 'tsyringe';
import { BeforeAction } from '../handlers/handleRequest';
import userContext from '../../app/contexts/userContext';
import AppError from '../../errors/AppError';
import firebaseIdTokenUtil from '../../utils/firebaseIdTokenUtil';
import UserRepository from '../../domain/repositories/userRepository';
import { userRepositoryToken } from '../../types/diTypes';

const authzHeaderRegexp = /^Bearer (.+)$/;

const requireSignIn: BeforeAction = (request: NowRequest) => {
  const { authorization } = request.headers;
  if (typeof authorization === 'undefined') {
    return TE.left(new AppError('auth/no_authorization_header'));
  }

  const match = authorization.match(authzHeaderRegexp);
  if (match === null) {
    return TE.left(new AppError('auth/invalid_authorization_header'));
  }

  const idToken = match[1];

  const userRepository = container.resolve<UserRepository>(userRepositoryToken);
  return pipe(
    firebaseIdTokenUtil.verifyIdTokenAndGetEmail(idToken),
    TE.chain(userRepository.findByEmail),
    TE.map(userContext.setCurrentUser),
    TE.map(() => request)
  );
};

export default requireSignIn;
