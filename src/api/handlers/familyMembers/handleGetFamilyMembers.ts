import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { ApiHandler } from '../handleRequest';
import FamilyMembersResponse from './responses/familyMembersResponse';
import GetAllFamilyMembersUseCase from '../../../domain/useCases/getAllFamilyMembersUseCase';
import AppError from '../../../errors/AppError';

const handleGetFamilyMembers: ApiHandler = (): TE.TaskEither<
  AppError,
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
