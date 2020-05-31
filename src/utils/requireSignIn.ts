import * as E from 'fp-ts/lib/Either';
import * as O from 'fp-ts/lib/Option';
import { UserContext } from '../app/contexts/userContext';
import AppError from '../errors/AppError';

const requireSignIn = (
  userContext: UserContext
): E.Either<AppError, UserContext> => {
  if (O.isSome(userContext.getCurrentUser())) {
    return E.right(userContext);
  }
  return E.left(new AppError('auth/require_sign_in'));
};

export default requireSignIn;
