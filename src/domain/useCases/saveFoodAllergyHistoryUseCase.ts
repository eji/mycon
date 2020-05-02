import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import RepositoryError from '../../errors/repositoryError';
import FoodAllergyHistory from '../models/foodAllergyHistory';
import FoodAllergyHistoryRepository from '../repositories/foodAllergyHistoryRepository';

type Params = {
  foodAllergyHistory: FoodAllergyHistory;
};

type ReturnValue = TE.TaskEither<RepositoryError, FoodAllergyHistory>;

/**
 * 食品アレルギー履歴を保存するためのユースケース
 */
export default class SaveFoodAllergyHistoryUseCase {
  constructor(
    readonly foodAllergyHistoryRepository: FoodAllergyHistoryRepository
  ) {}

  execute(params: Params): ReturnValue {
    const { foodAllergyHistory } = params;
    return pipe(
      this.foodAllergyHistoryRepository.saveValue(foodAllergyHistory),
      TE.map(() => foodAllergyHistory)
    );
  }
}
