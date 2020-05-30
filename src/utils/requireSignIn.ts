import * as E from 'fp-ts/lib/Either';
import * as O from 'fp-ts/lib/Option';
import { UserContext } from '../app/contexts/userContext';
import BaseError from '../errors/baseError';
import NotFoundError from '../errors/repositoryErrors/queryErrors/notFoundError';

const requireSignIn = (
  userContext: UserContext
): E.Either<BaseError, UserContext> => {
  if (O.isSome(userContext.getCurrentUser())) {
    return E.right(userContext);
  }
  return E.left(new NotFoundError());
};

export default requireSignIn;
