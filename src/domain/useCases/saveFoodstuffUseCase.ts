import * as TE from 'fp-ts/lib/TaskEither';
import { Foodstuff, UnpersistedFoodstuff } from '../models/foodstuff';
import FoodstuffRepository from '../repositories/foodstuffRepository';
import AppError from '../../errors/AppError';

type Params = {
  foodstuff: Foodstuff | UnpersistedFoodstuff;
};

/**
 * 食材を保存するためのユースケース
 */
export default class SaveFoodstuffUseCase {
  readonly foodstuffRepository: FoodstuffRepository;

  constructor(foodstuffRepository: FoodstuffRepository) {
    this.foodstuffRepository = foodstuffRepository;
  }

  execute = (params: Params): TE.TaskEither<AppError, Foodstuff> =>
    this.foodstuffRepository.saveValue(params.foodstuff);
}
