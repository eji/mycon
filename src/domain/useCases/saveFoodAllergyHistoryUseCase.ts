import * as TE from 'fp-ts/lib/TaskEither';
import RepositoryError from '../../errors/repositoryError';
import FoodAllergyHistory, {
  UnpersistedFoodAllergyHistory,
} from '../models/foodAllergyHistory';
import FoodAllergyHistoryRepository from '../repositories/foodAllergyHistoryRepository';

type Params = {
  foodAllergyHistory: FoodAllergyHistory | UnpersistedFoodAllergyHistory;
};

/**
 * 食品アレルギー履歴を保存するためのユースケース
 */
export default class SaveFoodAllergyHistoryUseCase {
  constructor(
    readonly foodAllergyHistoryRepository: FoodAllergyHistoryRepository
  ) {}

  execute = (
    params: Params
  ): TE.TaskEither<RepositoryError, FoodAllergyHistory> =>
    this.foodAllergyHistoryRepository.saveValue(params.foodAllergyHistory);
}
