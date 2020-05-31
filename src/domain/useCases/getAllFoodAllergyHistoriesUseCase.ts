import * as TE from 'fp-ts/lib/TaskEither';
import FoodAllergyHistoryRepository from '../repositories/foodAllergyHistoryRepository';
import FoodAllergyHistory from '../models/foodAllergyHistory';
import AppError from '../../errors/AppError';

/**
 * 全ての食物アレルギー履歴を取得するためのユースケース
 */
export default class GetAllFoodAllergyHistoriesUseCase {
  constructor(
    readonly foodAllergyHistoryRepository: FoodAllergyHistoryRepository
  ) {}

  execute = (): TE.TaskEither<AppError, FoodAllergyHistory[]> =>
    this.foodAllergyHistoryRepository.all();
}
