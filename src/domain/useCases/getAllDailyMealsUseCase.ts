import * as TE from 'fp-ts/lib/TaskEither';
import DailyMealRepository from '../repositories/dailyMealRepository';
import DailyMeal from '../models/dailyMeal';
import AppError from '../../errors/AppError';

/**
 * 全ての献立を取得するためのユースケース
 */
export default class GetAllDailyMealsUseCase {
  constructor(readonly dailyMealRepository: DailyMealRepository) {}

  execute = (): TE.TaskEither<AppError, DailyMeal[]> =>
    this.dailyMealRepository.all();
}
