import { NowRequest } from '@now/node';
import * as E from 'fp-ts/lib/Either';
import InvalidRequestError from '../../../../errors/requestErrors/clientErrors/invalidRequestError';

export type SignedInRequest = {
  idToken: string;
};

export const isSignedInRequest = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
): input is SignedInRequest => {
  if (input == null || typeof input !== 'object') {
    return false;
  }

  const { idToken } = input;
  return typeof idToken === 'string';
};

export const createSignedInRequestFromIdToken = (
  idToken: string
): SignedInRequest => ({
  idToken,
});

export const getSignedInRequest = (
  request: NowRequest
): E.Either<InvalidRequestError, SignedInRequest> => {
  if (isSignedInRequest(request.body)) {
    return E.right(request.body);
  }
  return E.left(new InvalidRequestError());
};
