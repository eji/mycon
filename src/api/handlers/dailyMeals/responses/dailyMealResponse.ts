import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import {
  MealResponseValue,
  isMealResponseValue,
  mealFromResponseValue,
  responseValueFromMeal,
} from '../../../commons/mealResponseValue';
import DailyMeal, {
  calendarDateFromDailyMealID,
  makeDailyMeal,
} from '../../../../domain/models/dailyMeal';
import AppError from '../../../../errors/AppError';

export type DailyMealResponseValue = {
  id: string;
  breakfast: MealResponseValue;
  lunch: MealResponseValue;
  dinner: MealResponseValue;
  snack: MealResponseValue;
};

type DailyMealResponse = {
  dailyMeal: DailyMealResponseValue;
};

export default DailyMealResponse;

export const isDailyMealResponseValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is DailyMealResponseValue => {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  const { id, breakfast, lunch, dinner, snack } = value;
  return (
    typeof id === 'string' &&
    isMealResponseValue(breakfast) &&
    isMealResponseValue(lunch) &&
    isMealResponseValue(dinner) &&
    isMealResponseValue(snack)
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isDailyMealResponse = (value: any): value is DailyMealResponse => {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  return isDailyMealResponseValue(value.dailyMeal);
};

export const dailyMealFromResponseValue = (
  value: DailyMealResponseValue
): E.Either<AppError, DailyMeal> => {
  const { id, breakfast, lunch, dinner, snack } = value;
  return pipe(
    E.fromNullable(new AppError('http_req/invalid_response_error'))(
      calendarDateFromDailyMealID(id)
    ),
    E.map((calendarDate) =>
      makeDailyMeal({
        calendarDate,
        breakfast: mealFromResponseValue(breakfast),
        lunch: mealFromResponseValue(lunch),
        dinner: mealFromResponseValue(dinner),
        snack: mealFromResponseValue(snack),
      })
    )
  );
};

export const dailyMealFromResponse = (
  response: DailyMealResponse
): E.Either<AppError, DailyMeal> =>
  dailyMealFromResponseValue(response.dailyMeal);

export const responseValueFromDailyMeal = (
  dailyMeal: DailyMeal
): DailyMealResponseValue => ({
  id: dailyMeal.id,
  breakfast: responseValueFromMeal(dailyMeal.breakfast),
  lunch: responseValueFromMeal(dailyMeal.lunch),
  dinner: responseValueFromMeal(dailyMeal.dinner),
  snack: responseValueFromMeal(dailyMeal.snack),
});
