import * as TE from 'fp-ts/lib/TaskEither';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import FamilyMember from '../../../domain/models/familyMember';
import FoodAllergyHistoryRepository from '../../../domain/repositories/foodAllergyHistoryRepository';
import FoodAllergyHistory, {
  UnpersistedFoodAllergyHistory,
} from '../../../domain/models/foodAllergyHistory';
import { Foodstuff } from '../../../domain/models/foodstuff';
import RestClient from '../../../drivers/restClient';
import FoodAllergyHistoriesResponse, {
  foodAllergyHistoriesFromResponse,
} from '../../../api/handlers/foodAllergyHistories/responses/foodAllergyHistoriesResponse';
import FoodAllergyHistoryResponse, {
  foodAllergyHistoryFromResponse,
} from '../../../api/handlers/foodAllergyHistories/responses/foodAllergyHistoryResponse';
import {
  createRequestFromFoodAllergyHistory,
  CreateFoodAllergyHistoryRequest,
} from '../../../api/handlers/foodAllergyHistories/requests/createFoodAllergyHistoryRequest';
import {
  replaceRequestFromFoodAllergyHistory,
  ReplaceFoodAllergyHistoryRequest,
} from '../../../api/handlers/foodAllergyHistories/requests/replaceFoodAllergyHistoryRequest';
import { isPersisted } from '../../../types/unpersisted';
import AppError from '../../../errors/AppError';

export default class FoodAllergyHistoryRepositoryAppServer
  implements FoodAllergyHistoryRepository {
  constructor(readonly restClient: RestClient) {}

  all = (): TE.TaskEither<AppError, FoodAllergyHistory[]> =>
    pipe(
      this.restClient.all<FoodAllergyHistoriesResponse>(),
      TE.map(foodAllergyHistoriesFromResponse)
    );

  findAllByFoodstuff = (
    foodstuff: Foodstuff
  ): TE.TaskEither<AppError, FoodAllergyHistory[]> =>
    pipe(
      this.restClient.all<FoodAllergyHistoriesResponse>(),
      TE.map(foodAllergyHistoriesFromResponse),
      TE.map((foodAllergyHistories) =>
        foodAllergyHistories.filter((fah) => fah.foodstuff.equals(foodstuff))
      )
    );

  findAllByFamilyMember = (
    familyMember: FamilyMember
  ): TE.TaskEither<AppError, FoodAllergyHistory[]> =>
    pipe(
      this.restClient.all<FoodAllergyHistoriesResponse>(),
      TE.map(foodAllergyHistoriesFromResponse),
      TE.map((foodAllergyHistories) =>
        foodAllergyHistories.filter((fah) =>
          fah.familyMember.equals(familyMember)
        )
      )
    );

  saveValue = (
    foodAllergyHistory: FoodAllergyHistory | UnpersistedFoodAllergyHistory
  ): TE.TaskEither<AppError, FoodAllergyHistory> =>
    isPersisted<FoodAllergyHistory>(foodAllergyHistory)
      ? this.replaceValue(foodAllergyHistory)
      : this.createValue(foodAllergyHistory);

  saveValues = (
    foodAllergyHistories: (FoodAllergyHistory | UnpersistedFoodAllergyHistory)[]
  ): TE.TaskEither<AppError, FoodAllergyHistory[]> =>
    A.array.sequence(TE.taskEither)(foodAllergyHistories.map(this.saveValue));

  private createValue = (
    foodAllergyHistory: UnpersistedFoodAllergyHistory
  ): TE.TaskEither<AppError, FoodAllergyHistory> =>
    pipe(
      createRequestFromFoodAllergyHistory(foodAllergyHistory),
      (request) =>
        this.restClient.create<
          CreateFoodAllergyHistoryRequest,
          FoodAllergyHistoryResponse
        >(request),
      TE.map(foodAllergyHistoryFromResponse)
    );

  private replaceValue = (
    foodAllergyHistory: FoodAllergyHistory
  ): TE.TaskEither<AppError, FoodAllergyHistory> =>
    pipe(
      replaceRequestFromFoodAllergyHistory(foodAllergyHistory),
      (request) =>
        this.restClient.replace<
          ReplaceFoodAllergyHistoryRequest,
          FoodAllergyHistoryResponse
        >(request),
      TE.map(foodAllergyHistoryFromResponse)
    );
}
