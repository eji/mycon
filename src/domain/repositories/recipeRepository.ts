import { TaskEither } from 'fp-ts/lib/TaskEither';
import Recipe, { RecipeID } from '../models/recipe';
import QueryError from '../../errors/repositoryErrors/queryError';
import CommandError from '../../errors/repositoryErrors/commandError';

export default interface RecipeRepository {
  findById(id: RecipeID): TaskEither<QueryError, Recipe>;
  saveValue(recipe: Recipe): TaskEither<CommandError, boolean>;
  saveValues(recipes: Recipe[]): TaskEither<CommandError, boolean>;
}
