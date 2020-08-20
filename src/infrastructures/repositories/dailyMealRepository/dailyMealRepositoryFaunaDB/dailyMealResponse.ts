import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import { sequenceT } from 'fp-ts/lib/Apply';
import AppError from '../../../../errors/AppError';
import DailyMeal, {
  makeDailyMeal,
  calendarDateFromDailyMealID,
} from '../../../../domain/models/dailyMeal';
import MealResponse, { buildMealFromMealResponse } from './mealResponse';

export default interface DailyMealResponse {
  readonly _id: string;
  readonly dailyMealID: string;
  readonly breakfast: MealResponse;
  readonly lunch: MealResponse;
  readonly dinner: MealResponse;
  readonly snack: MealResponse;
}

export const buildDailyMealFromDailyMealResponse = (
  res: DailyMealResponse
): E.Either<AppError, DailyMeal> => {
  return pipe(
    sequenceT(E.either)(
      E.fromNullable(new AppError('graphql/invalid_response'))(
        calendarDateFromDailyMealID(res.dailyMealID)
      ),
      buildMealFromMealResponse(res.breakfast),
      buildMealFromMealResponse(res.lunch),
      buildMealFromMealResponse(res.dinner),
      buildMealFromMealResponse(res.snack)
    ),
    E.map(([calendarDate, breakfast, lunch, dinner, snack]) =>
      makeDailyMeal({
        calendarDate,
        breakfast,
        lunch,
        dinner,
        snack,
      })
    )
  );
};
