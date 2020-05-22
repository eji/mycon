import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { ApiHandler } from '../handleRequest';
import BaseError from '../../../errors/baseError';
import FamilyMembersResponse from './responses/familyMembersResponse';
import GetAllFamilyMembersUseCase from '../../../domain/useCases/getAllFamilyMembersUseCase';

const handleGetFamilyMembers: ApiHandler = (): TE.TaskEither<
  BaseError,
  FamilyMembersResponse
> =>
  pipe(
    container.resolve<GetAllFamilyMembersUseCase>(GetAllFamilyMembersUseCase),
    (useCase) => useCase.execute(),
    TE.map((familyMembers) => ({
      familyMembers: familyMembers.map((foodstuff) => ({
        id: foodstuff.id,
        name: foodstuff.name,
      })),
    }))
  );

export default handleGetFamilyMembers;
