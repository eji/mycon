import * as TE from 'fp-ts/lib/TaskEither';
import RepositoryError from '../../errors/repositoryError';
import RecipeRepository from '../repositories/recipeRepository';
import Recipe from '../models/recipe';

/**
 * 全てのレシピを取得するためのユースケース
 */
export default class GetAllRecipesUseCase {
  constructor(readonly recipeRepository: RecipeRepository) {}

  execute = (): TE.TaskEither<RepositoryError, Recipe[]> =>
    this.recipeRepository.all();
}
