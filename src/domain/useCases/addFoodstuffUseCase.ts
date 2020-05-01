import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import RepositoryError from '../../errors/repositoryError';
import { Foodstuff } from '../models/foodstuff';
import FoodstuffRepository from '../repositories/foodstuffRepository';

type Params = {
  foodstuff: Foodstuff;
};

/**
 * 食材を追加するためのユースケース
 */
export default class AddFoodstuffUseCase {
  readonly foodstuffRepository: FoodstuffRepository;

  constructor(foodstuffRepository: FoodstuffRepository) {
    this.foodstuffRepository = foodstuffRepository;
  }

  execute(params: Params): TE.TaskEither<RepositoryError, Foodstuff> {
    const { foodstuff } = params;
    return pipe(
      this.foodstuffRepository.saveValue(foodstuff),
      TE.map(() => foodstuff)
    );
  }
}
