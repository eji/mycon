import * as E from 'fp-ts/lib/Either';
import * as A from 'fp-ts/lib/Array';
import {
  DailyMealResponseValue,
  isDailyMealResponseValue,
  dailyMealFromResponseValue,
  responseValueFromDailyMeal,
} from './dailyMealResponse';
import DailyMeal from '../../../../domain/models/dailyMeal';
import InvalidResponseError from '../../../../errors/httpErrors/invalidResponseError';
import BaseError from '../../../../errors/baseError';

type DailyMealsResponse = {
  dailyMeals: DailyMealResponseValue[];
};

export default DailyMealsResponse;

export const isDailyMealsResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is DailyMealsResponse => {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  return (
    Array.isArray(value.dailyMeals) &&
    value.dailyMeals.every(isDailyMealResponseValue)
  );
};

export const dailyMealsFromResponse = (
  response: DailyMealsResponse
): E.Either<BaseError, DailyMeal[]> =>
  A.array.sequence(E.either)(
    response.dailyMeals.map(dailyMealFromResponseValue)
  );

export const responseFromDailyMeals = (
  dailyMeals: DailyMeal[]
): DailyMealsResponse => ({
  dailyMeals: dailyMeals.map(responseValueFromDailyMeal),
});
