import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import DailyMealRepository from '../../../domain/repositories/dailyMealRepository';
import DailyMeal from '../../../domain/models/dailyMeal';
import RestClient from '../../../drivers/restClient';
import DailyMealsResponse, {
  dailyMealsFromResponse,
} from '../../../api/handlers/dailyMeals/responses/dailyMealsResponse';
import DailyMealResponse, {
  dailyMealFromResponse,
} from '../../../api/handlers/dailyMeals/responses/dailyMealResponse';
import {
  requestFromDailyMeal,
  ReplaceDailyMealRequest,
} from '../../../api/handlers/dailyMeals/requests/replaceDailyMealRequest';
import AppError from '../../../errors/AppError';

export default class DailyMealRepositoryAppServer
  implements DailyMealRepository {
  constructor(readonly restClient: RestClient) {}

  all = (): TE.TaskEither<AppError, DailyMeal[]> =>
    pipe(
      this.restClient.all<DailyMealsResponse>(),
      TE.chainEitherK(dailyMealsFromResponse)
    );

  saveValue = (dailyMeal: DailyMeal): TE.TaskEither<AppError, DailyMeal> =>
    pipe(
      requestFromDailyMeal(dailyMeal),
      (req) =>
        this.restClient.replace<ReplaceDailyMealRequest, DailyMealResponse>(
          req
        ),
      TE.chainEitherK(dailyMealFromResponse)
    );
}
