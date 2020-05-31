import * as TE from 'fp-ts/lib/TaskEither';
import FoodAllergyHistory, {
  UnpersistedFoodAllergyHistory,
} from '../models/foodAllergyHistory';
import FoodAllergyHistoryRepository from '../repositories/foodAllergyHistoryRepository';
import AppError from '../../errors/AppError';

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

  execute = (params: Params): TE.TaskEither<AppError, FoodAllergyHistory> =>
    this.foodAllergyHistoryRepository.saveValue(params.foodAllergyHistory);
}
