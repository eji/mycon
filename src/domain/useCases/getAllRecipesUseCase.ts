import * as TE from 'fp-ts/lib/TaskEither';
import RecipeRepository from '../repositories/recipeRepository';
import Recipe from '../models/recipe';
import AppError from '../../errors/AppError';

/**
 * 全てのレシピを取得するためのユースケース
 */
export default class GetAllRecipesUseCase {
  constructor(readonly recipeRepository: RecipeRepository) {}

  execute = (): TE.TaskEither<AppError, Recipe[]> =>
    this.recipeRepository.all();
}
