import { container } from 'tsyringe';
import { NowRequest } from '@now/node';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import { ApiHandler } from '../handleRequest';
import FamilyMemberResponse from './responses/familyMemberResponse';
import { getCreateFamilyMemberRequest } from './requests/createFamilyMemberRequest';
import { makeFamilyMember } from '../../../domain/models/familyMember';
import SaveFamilyMemberUseCase from '../../../domain/useCases/saveFamilyMemberUseCase';
import AppError from '../../../errors/AppError';

const handleCreateFamilyMember: ApiHandler = (
  request: NowRequest
): TE.TaskEither<AppError, FamilyMemberResponse> =>
  pipe(
    getCreateFamilyMemberRequest(request.body),
    E.map((input) => makeFamilyMember(input)),
    TE.fromEither,
    TE.chain((inputFamilyMember) =>
      container
        .resolve<SaveFamilyMemberUseCase>(SaveFamilyMemberUseCase)
        .execute({ familyMember: inputFamilyMember })
    ),
    TE.map((createdFamilyMember) => ({
      familyMember: {
        id: createdFamilyMember.id,
        name: createdFamilyMember.name,
      },
    }))
  );

export default handleCreateFamilyMember;
