import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import RepositoryError from '../../errors/repositoryError';
import { Foodstuff } from '../models/foodstuff';
import FoodstuffRepository from '../repositories/foodstuffRepository';

type Params = {
  foodstuff: Foodstuff;
};

type ReturnValue = TE.TaskEither<RepositoryError, Foodstuff>;

/**
 * 食材を保存するためのユースケース
 */
export default class SaveFoodstuffUseCase {
  readonly foodstuffRepository: FoodstuffRepository;

  constructor(foodstuffRepository: FoodstuffRepository) {
    this.foodstuffRepository = foodstuffRepository;
  }

  execute(params: Params): ReturnValue {
    const { foodstuff } = params;
    return pipe(
      this.foodstuffRepository.saveValue(foodstuff),
      TE.map(() => foodstuff)
    );
  }
}
