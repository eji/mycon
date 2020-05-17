import * as TE from 'fp-ts/lib/TaskEither';
import RepositoryError from '../../errors/repositoryError';
import { Foodstuff } from '../models/foodstuff';
import FoodstuffRepository from '../repositories/foodstuffRepository';

/**
 * 全ての食材を取得するためのユースケース
 */
export default class GetAllFoodstuffsUseCase {
  readonly foodstuffRepository: FoodstuffRepository;

  constructor(foodstuffRepository: FoodstuffRepository) {
    this.foodstuffRepository = foodstuffRepository;
  }

  execute(): TE.TaskEither<RepositoryError, Foodstuff[]> {
    return this.foodstuffRepository.all();
  }
}
