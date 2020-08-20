import * as E from 'fp-ts/lib/Either';
import AppError from '../../../../errors/AppError';
import DailyMealResponse, {
  buildDailyMealFromDailyMealResponse,
} from './dailyMealResponse';
import DailyMeal from '../../../../domain/models/dailyMeal';

export default interface CreateDailyMealResponse {
  readonly createDailyMeal: DailyMealResponse;
}

export const buildDailyMealFromCreateDailyMealResponse = (
  res: CreateDailyMealResponse
): E.Either<AppError, DailyMeal> => {
  return buildDailyMealFromDailyMealResponse(res.createDailyMeal);
};
