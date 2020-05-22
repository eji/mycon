import { container } from 'tsyringe';
import { NowRequest } from '@now/node';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import BaseError from '../../../errors/baseError';
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
import NotFoundError from '../../../errors/repositoryErrors/queryErrors/notFoundError';
import SaveFoodAllergyHistoryUseCase from '../../../domain/useCases/saveFoodAllergyHistoryUseCase';
import FoodAllergyHistoryResponse from './responses/foodAllergyHistoryResponse';
import { responseValueFromFoodstuff } from '../foodstuffs/responses/foodstuffResponse';
import { responseValueFromFamilyMember } from '../familyMembers/responses/familyMemberResponse';

const getAllFoodstuffs = (): TE.TaskEither<BaseError, Foodstuff[]> =>
  container.resolve<GetAllFoodstuffsUseCase>(GetAllFoodstuffsUseCase).execute();

const getAllFamilyMembers = (): TE.TaskEither<BaseError, FamilyMember[]> =>
  container
    .resolve<GetAllFamilyMembersUseCase>(GetAllFamilyMembersUseCase)
    .execute();

const getAllFoodstuffsAndFamilyMembers = (): TE.TaskEither<
  BaseError,
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
): E.Either<NotFoundError, Foodstuff> => {
  const foodstuff = foodstuffs.find((f) => f.id === foodstuffId);
  if (typeof foodstuff === 'undefined') {
    return E.left(new NotFoundError());
  }
  return E.right(foodstuff);
};

const findFamilyMember = (
  familyMembers: FamilyMember[],
  familyMemberId: string
): E.Either<NotFoundError, FamilyMember> => {
  const familyMember = familyMembers.find((f) => f.id === familyMemberId);
  if (typeof familyMember === 'undefined') {
    return E.left(new NotFoundError());
  }
  return E.right(familyMember);
};

const buildFoodAllergyHistory = (
  request: CreateFoodAllergyHistoryRequest,
  foodstuffs: Foodstuff[],
  familyMembers: FamilyMember[]
): E.Either<NotFoundError, UnpersistedFoodAllergyHistory> =>
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
): TE.TaskEither<BaseError, FoodAllergyHistoryResponse> =>
  pipe(
    getCreateFoodAllergyHistoryRequest(request),
    TE.fromEither,
    TE.chain(
      (
        input: CreateFoodAllergyHistoryRequest
      ): TE.TaskEither<BaseError, UnpersistedFoodAllergyHistory> =>
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
