import * as E from 'fp-ts/lib/Either';
import * as A from 'fp-ts/lib/Array';
import AppError from '../../../../errors/AppError';
import DailyMealResponse, {
  buildDailyMealFromDailyMealResponse,
} from './dailyMealResponse';
import DailyMeal from '../../../../domain/models/dailyMeal';

interface DailyMealsResponse {
  readonly dailyMeals: {
    readonly data: DailyMealResponse[];
  };
}

export default interface FindAllDailyMealsResponse {
  readonly findUserByID: DailyMealsResponse | null;
}

export interface FoundDailyMealsResponse {
  readonly findUserByID: DailyMealsResponse;
}

export const isFoundDailyMealsResponse = (
  res: FindAllDailyMealsResponse
): res is FoundDailyMealsResponse => res.findUserByID !== null;

export const buildDailyMealsFromFoundDailyMealsResponse = (
  res: FoundDailyMealsResponse
): E.Either<AppError, DailyMeal[]> => {
  return A.array.sequence(E.either)(
    res.findUserByID.dailyMeals.data.map(buildDailyMealFromDailyMealResponse)
  );
};
