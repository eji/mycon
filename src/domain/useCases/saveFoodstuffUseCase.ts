import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import RepositoryError from '../../errors/repositoryError';
import { Foodstuff, UnpersistedFoodstuff } from '../models/foodstuff';
import FoodstuffRepository from '../repositories/foodstuffRepository';

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

  execute = (params: Params): TE.TaskEither<RepositoryError, Foodstuff> =>
    this.foodstuffRepository.saveValue(params.foodstuff);
}
