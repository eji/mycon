import * as TE from 'fp-ts/lib/TaskEither';
import DailyMealRepository from '../repositories/dailyMealRepository';
import BaseError from '../../errors/baseError';
import DailyMeal from '../models/dailyMeal';

/**
 * 全ての献立を取得するためのユースケース
 */
export default class GetAllDailyMealsUseCase {
  constructor(readonly dailyMealRepository: DailyMealRepository) {}

  execute = (): TE.TaskEither<BaseError, DailyMeal[]> =>
    this.dailyMealRepository.all();
}
