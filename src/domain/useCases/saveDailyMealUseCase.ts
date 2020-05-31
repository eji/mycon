import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import DailyMeal from '../models/dailyMeal';
import DailyMealRepository from '../repositories/dailyMealRepository';
import AppError from '../../errors/AppError';

type Params = {
  dailyMeal: DailyMeal;
};

/**
 * 一日の献立を保存するユースケース
 */
export default class SaveDailyMealUseCase {
  constructor(readonly dailyMealRepository: DailyMealRepository) {}

  execute = (params: Params): TE.TaskEither<AppError, DailyMeal> =>
    pipe(
      this.dailyMealRepository.saveValue(params.dailyMeal),
      TE.map(() => params.dailyMeal)
    );
}
