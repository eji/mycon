import { TaskEither } from 'fp-ts/lib/TaskEither';
import QueryError from '../../errors/repositoryErrors/queryError';
import CommandError from '../../errors/repositoryErrors/commandError';
import { Foodstuff } from '../models/foodstuff';

export default interface FoodstuffRepository {
  all(): TaskEither<QueryError, Foodstuff[]>;
  saveValue(foodstuff: Foodstuff): TaskEither<CommandError, unknown>;
  saveValues(foodstuffs: Foodstuff[]): TaskEither<CommandError, unknown>;
}
