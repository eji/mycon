import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import RepositoryError from '../../errors/repositoryError';
import Recipe from '../models/recipe';
import RecipeRepository from '../repositories/recipeRepository';

type Params = {
  recipe: Recipe;
};

/**
 * レシピを保存するためのユースケース
 */
export default class SaveRecipeUseCase {
  readonly recipeRepository: RecipeRepository;

  constructor(recipeRepository: RecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  execute(params: Params): TE.TaskEither<RepositoryError, Recipe> {
    const { recipe } = params;
    return pipe(
      this.recipeRepository.saveValue(recipe),
      TE.map(() => recipe)
    );
  }
}
