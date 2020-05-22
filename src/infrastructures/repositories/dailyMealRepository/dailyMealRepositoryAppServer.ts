import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import DailyMealRepository from '../../../domain/repositories/dailyMealRepository';
import DailyMeal, {
  dailyMealIDFromCalendarDate,
} from '../../../domain/models/dailyMeal';
import CalendarDate from '../../../domain/models/calender/calendarDate';
import BaseError from '../../../errors/baseError';
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

export default class DailyMealRepositoryAppServer
  implements DailyMealRepository {
  constructor(readonly restClient: RestClient) {}

  all = (): TE.TaskEither<BaseError, DailyMeal[]> =>
    pipe(
      this.restClient.all<DailyMealsResponse>(),
      TE.chainEitherK(dailyMealsFromResponse)
    );

  findByCalendarDate = (
    calendarDate: CalendarDate
  ): TE.TaskEither<BaseError, DailyMeal> =>
    pipe(
      dailyMealIDFromCalendarDate(calendarDate),
      (id) => this.restClient.show<DailyMealResponse>(id),
      TE.chainEitherK(dailyMealFromResponse)
    );

  saveValue = (dailyMeal: DailyMeal): TE.TaskEither<BaseError, DailyMeal> =>
    pipe(
      requestFromDailyMeal(dailyMeal),
      (req) =>
        this.restClient.replace<ReplaceDailyMealRequest, DailyMealResponse>(
          req
        ),
      TE.chainEitherK(dailyMealFromResponse)
    );
}
