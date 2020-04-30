import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import * as T from 'fp-ts/lib/Task';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import RepositoryError from '../../errors/repositoryError';
import { Foodstuff } from '../models/foodstuff';
import FoodstuffRepository from '../repositories/foodstuffRepository';
import CommandError from '../../errors/repositoryErrors/commandError';

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
      T.map((result: O.Option<CommandError>) =>
        O.isNone(result) ? E.right(foodstuff) : E.left(result.value)
      )
    );
  }
}
