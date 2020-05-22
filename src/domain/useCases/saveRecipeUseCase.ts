import * as TE from 'fp-ts/lib/TaskEither';
import RepositoryError from '../../errors/repositoryError';
import Recipe, { UnpersistedRecipe } from '../models/recipe';
import RecipeRepository from '../repositories/recipeRepository';

type Params = {
  recipe: Recipe | UnpersistedRecipe;
};

/**
 * レシピを保存するためのユースケース
 */
export default class SaveRecipeUseCase {
  constructor(readonly recipeRepository: RecipeRepository) {}

  execute = (params: Params): TE.TaskEither<RepositoryError, Recipe> =>
    this.recipeRepository.saveValue(params.recipe);
}
