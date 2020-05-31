import * as TE from 'fp-ts/lib/TaskEither';
import Recipe, { UnpersistedRecipe } from '../models/recipe';
import RecipeRepository from '../repositories/recipeRepository';
import AppError from '../../errors/AppError';

type Params = {
  recipe: Recipe | UnpersistedRecipe;
};

/**
 * レシピを保存するためのユースケース
 */
export default class SaveRecipeUseCase {
  constructor(readonly recipeRepository: RecipeRepository) {}

  execute = (params: Params): TE.TaskEither<AppError, Recipe> =>
    this.recipeRepository.saveValue(params.recipe);
}
