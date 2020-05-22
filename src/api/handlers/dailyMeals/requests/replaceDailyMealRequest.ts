import * as E from 'fp-ts/lib/Either';
import { NowRequest } from '@now/node';
import InvalidRequestError from '../../../../errors/requestErrors/clientErrors/invalidRequestError';
import {
  MealRequestValue,
  isMealRequestValue,
  requestValueFromMeal,
} from '../../../commons/mealRequestValue';
import DailyMeal from '../../../../domain/models/dailyMeal';

export type ReplaceDailyMealRequestBody = {
  breakfast: MealRequestValue;
  lunch: MealRequestValue;
  dinner: MealRequestValue;
  snack: MealRequestValue;
};

export type ReplaceDailyMealRequest = ReplaceDailyMealRequestBody & {
  id: string;
};

export const isReplaceDailyMealRequestBody = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
): input is ReplaceDailyMealRequestBody => {
  if (input == null || typeof input !== 'object') {
    return false;
  }

  const { breakfast, lunch, dinner, snack } = input;

  return (
    isMealRequestValue(breakfast) &&
    isMealRequestValue(lunch) &&
    isMealRequestValue(dinner) &&
    isMealRequestValue(snack)
  );
};

export const requestFromDailyMeal = (
  dailyMeal: DailyMeal
): ReplaceDailyMealRequest => ({
  id: dailyMeal.id,
  breakfast: requestValueFromMeal(dailyMeal.breakfast),
  lunch: requestValueFromMeal(dailyMeal.lunch),
  dinner: requestValueFromMeal(dailyMeal.dinner),
  snack: requestValueFromMeal(dailyMeal.snack),
});

export const getReplaceDailyMealRequest = (
  request: NowRequest
): E.Either<InvalidRequestError, ReplaceDailyMealRequest> => {
  const { id } = request.query;
  if (id == null || typeof id !== 'string') {
    return E.left(new InvalidRequestError());
  }

  if (!isReplaceDailyMealRequestBody(request.body)) {
    return E.left(new InvalidRequestError());
  }

  return E.right({
    id,
    breakfast: request.body.breakfast,
    lunch: request.body.lunch,
    dinner: request.body.dinner,
    snack: request.body.snack,
  });
};
