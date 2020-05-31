import { container } from 'tsyringe';
import { NowRequest } from '@now/node';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import { ApiHandler } from '../handleRequest';
import FamilyMember from '../../../domain/models/familyMember';
import {
  getCreateFoodAllergyHistoryRequest,
  CreateFoodAllergyHistoryRequest,
} from './requests/createFoodAllergyHistoryRequest';
import {
  makeFoodAllergyHistory,
  UnpersistedFoodAllergyHistory,
} from '../../../domain/models/foodAllergyHistory';
import GetAllFoodstuffsUseCase from '../../../domain/useCases/getAllFoodstuffsUseCase';
import { Foodstuff } from '../../../domain/models/foodstuff';
import GetAllFamilyMembersUseCase from '../../../domain/useCases/getAllFamilyMembersUseCase';
import SaveFoodAllergyHistoryUseCase from '../../../domain/useCases/saveFoodAllergyHistoryUseCase';
import FoodAllergyHistoryResponse from './responses/foodAllergyHistoryResponse';
import { responseValueFromFoodstuff } from '../foodstuffs/responses/foodstuffResponse';
import { responseValueFromFamilyMember } from '../familyMembers/responses/familyMemberResponse';
import AppError from '../../../errors/AppError';

const getAllFoodstuffs = (): TE.TaskEither<AppError, Foodstuff[]> =>
  container.resolve<GetAllFoodstuffsUseCase>(GetAllFoodstuffsUseCase).execute();

const getAllFamilyMembers = (): TE.TaskEither<AppError, FamilyMember[]> =>
  container
    .resolve<GetAllFamilyMembersUseCase>(GetAllFamilyMembersUseCase)
    .execute();

const getAllFoodstuffsAndFamilyMembers = (): TE.TaskEither<
  AppError,
  [Foodstuff[], FamilyMember[]]
> =>
  pipe(
    getAllFoodstuffs(),
    TE.chain((foodstuffs) =>
      pipe(
        getAllFamilyMembers(),
        TE.map((familyMembers) => [foodstuffs, familyMembers])
      )
    )
  );

const findFoodstuff = (
  foodstuffs: Foodstuff[],
  foodstuffId: string
): E.Either<AppError, Foodstuff> => {
  const foodstuff = foodstuffs.find((f) => f.id === foodstuffId);
  if (typeof foodstuff === 'undefined') {
    return E.left(new AppError('repos/not_found_error'));
  }
  return E.right(foodstuff);
};

const findFamilyMember = (
  familyMembers: FamilyMember[],
  familyMemberId: string
): E.Either<AppError, FamilyMember> => {
  const familyMember = familyMembers.find((f) => f.id === familyMemberId);
  if (typeof familyMember === 'undefined') {
    return E.left(new AppError('repos/not_found_error'));
  }
  return E.right(familyMember);
};

const buildFoodAllergyHistory = (
  request: CreateFoodAllergyHistoryRequest,
  foodstuffs: Foodstuff[],
  familyMembers: FamilyMember[]
): E.Either<AppError, UnpersistedFoodAllergyHistory> =>
  pipe(
    findFoodstuff(foodstuffs, request.foodstuffId),
    E.chain((foodstuff) =>
      pipe(
        findFamilyMember(familyMembers, request.familyMemberId),
        E.map((familyMember) =>
          makeFoodAllergyHistory({
            foodstuff,
            familyMember,
          })
        )
      )
    )
  );

const handleCreateFoodAllergyHistory: ApiHandler = (
  request: NowRequest
): TE.TaskEither<AppError, FoodAllergyHistoryResponse> =>
  pipe(
    getCreateFoodAllergyHistoryRequest(request),
    TE.fromEither,
    TE.chain(
      (
        input: CreateFoodAllergyHistoryRequest
      ): TE.TaskEither<AppError, UnpersistedFoodAllergyHistory> =>
        pipe(
          getAllFoodstuffsAndFamilyMembers(),
          TE.chainEitherK(([foodstuffs, familyMembers]) =>
            buildFoodAllergyHistory(input, foodstuffs, familyMembers)
          )
        )
    ),
    TE.map((input) => makeFoodAllergyHistory(input)),
    TE.chain((inputFoodAllergyHistory) =>
      container
        .resolve<SaveFoodAllergyHistoryUseCase>(SaveFoodAllergyHistoryUseCase)
        .execute({ foodAllergyHistory: inputFoodAllergyHistory })
    ),
    TE.map((createdFoodAllergyHistory) => ({
      foodAllergyHistory: {
        id: createdFoodAllergyHistory.id,
        familyMember: responseValueFromFamilyMember(
          createdFoodAllergyHistory.familyMember
        ),
        foodstuff: responseValueFromFoodstuff(
          createdFoodAllergyHistory.foodstuff
        ),
      },
    }))
  );

export default handleCreateFoodAllergyHistory;
