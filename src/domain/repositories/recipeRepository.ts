import { TaskEither } from 'fp-ts/lib/TaskEither';
import Recipe, { RecipeID, UnpersistedRecipe } from '../models/recipe';
import BaseError from '../../errors/baseError';

export default interface RecipeRepository {
  findById(id: RecipeID): TaskEither<BaseError, Recipe>;
  all(): TaskEither<BaseError, Recipe[]>;
  saveValue(recipe: Recipe | UnpersistedRecipe): TaskEither<BaseError, Recipe>;
  saveValues(
    recipes: (Recipe | UnpersistedRecipe)[]
  ): TaskEither<BaseError, Recipe[]>;
}
