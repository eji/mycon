import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Task } from 'fp-ts/lib/Task';
import { Option } from 'fp-ts/lib/Option';
import QueryError from '../../errors/repositoryErrors/queryError';
import CommandError from '../../errors/repositoryErrors/commandError';
import { Foodstuff } from '../models/foodstuff';

export default interface FoodstuffRepository {
  all(): TaskEither<QueryError, Foodstuff[]>;
  saveValue(foodstuff: Foodstuff): Task<Option<CommandError>>;
  saveValues(foodstuffs: Foodstuff[]): Task<Option<CommandError>>;
}
