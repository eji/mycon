import * as TE from 'fp-ts/lib/TaskEither';
import RepositoryError from '../../errors/repositoryError';
import FoodAllergyHistoryRepository from '../repositories/foodAllergyHistoryRepository';
import FoodAllergyHistory from '../models/foodAllergyHistory';

/**
 * 全ての食物アレルギー履歴を取得するためのユースケース
 */
export default class GetAllFoodAllergyHistoriesUseCase {
  constructor(
    readonly foodAllergyHistoryRepository: FoodAllergyHistoryRepository
  ) {}

  execute = (): TE.TaskEither<RepositoryError, FoodAllergyHistory[]> =>
    this.foodAllergyHistoryRepository.all();
}
