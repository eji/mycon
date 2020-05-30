import { container } from 'tsyringe';
import { NowRequest } from '@now/node';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import BaseError from '../../../errors/baseError';
import { ApiHandler } from '../handleRequest';
import inspect from '../../../utils/taskEitherHelpers';
import {
  getSignedInRequest,
  SignedInRequest,
} from './requests/signedInRequest';
import SignedInService from '../../../app/services/signedInService';
import SignedInResponse, {
  signedInResponseFromUser,
} from './responses/signedInResponse';
import User from '../../../domain/models/user';

const executeSingedInService = (
  request: SignedInRequest
): TE.TaskEither<BaseError, User> =>
  container
    .resolve<SignedInService>(SignedInService)
    .execute({ idToken: request.idToken });

const handleCreateSignedIn: ApiHandler = (
  request: NowRequest
): TE.TaskEither<BaseError, SignedInResponse> =>
  pipe(
    TE.fromEither(getSignedInRequest(request)),
    TE.chain(executeSingedInService),
    TE.map(signedInResponseFromUser),
    TE.mapLeft(inspect((val) => console.error(val)))
  );

export default handleCreateSignedIn;
