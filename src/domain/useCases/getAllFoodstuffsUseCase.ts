import * as TE from 'fp-ts/lib/TaskEither';
import { Foodstuff } from '../models/foodstuff';
import FoodstuffRepository from '../repositories/foodstuffRepository';
import AppError from '../../errors/AppError';

/**
 * 全ての食材を取得するためのユースケース
 */
export default class GetAllFoodstuffsUseCase {
  readonly foodstuffRepository: FoodstuffRepository;

  constructor(foodstuffRepository: FoodstuffRepository) {
    this.foodstuffRepository = foodstuffRepository;
  }

  execute = (): TE.TaskEither<AppError, Foodstuff[]> =>
    this.foodstuffRepository.all();
}
