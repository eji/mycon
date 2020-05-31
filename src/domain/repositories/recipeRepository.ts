import { TaskEither } from 'fp-ts/lib/TaskEither';
import Recipe, { RecipeID, UnpersistedRecipe } from '../models/recipe';
import AppError from '../../errors/AppError';

export default interface RecipeRepository {
  findById(id: RecipeID): TaskEither<AppError, Recipe>;
  all(): TaskEither<AppError, Recipe[]>;
  saveValue(recipe: Recipe | UnpersistedRecipe): TaskEither<AppError, Recipe>;
  saveValues(
    recipes: (Recipe | UnpersistedRecipe)[]
  ): TaskEither<AppError, Recipe[]>;
}
