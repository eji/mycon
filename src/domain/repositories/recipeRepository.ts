import { TaskEither } from 'fp-ts/lib/TaskEither';
import Recipe, { UnpersistedRecipe } from '../models/recipe';
import AppError from '../../errors/AppError';

export default interface RecipeRepository {
  all(): TaskEither<AppError, Recipe[]>;
  saveValue(recipe: Recipe | UnpersistedRecipe): TaskEither<AppError, Recipe>;
}
