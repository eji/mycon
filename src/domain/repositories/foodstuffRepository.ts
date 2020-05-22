import { TaskEither } from 'fp-ts/lib/TaskEither';
import QueryError from '../../errors/repositoryErrors/queryError';
import CommandError from '../../errors/repositoryErrors/commandError';
import { Foodstuff, UnpersistedFoodstuff } from '../models/foodstuff';

export default interface FoodstuffRepository {
  all(): TaskEither<QueryError, Foodstuff[]>;
  saveValue(
    foodstuff: Foodstuff | UnpersistedFoodstuff
  ): TaskEither<CommandError, Foodstuff>;
  saveValues(
    foodstuffs: (Foodstuff | UnpersistedFoodstuff)[]
  ): TaskEither<CommandError, Foodstuff[]>;
}
