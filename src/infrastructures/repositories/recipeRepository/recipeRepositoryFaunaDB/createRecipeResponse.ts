import * as E from 'fp-ts/lib/Either';
import AppError from '../../../../errors/AppError';
import Recipe from '../../../../domain/models/recipe';
import RecipeResponse, {
  buildRecipeFromRecipeResponse,
} from './recipeResponse';

export default interface CreateRecipeResponse {
  readonly createRecipe: RecipeResponse;
}

export const buildRecipeFromCreateRecipeResponse = (
  res: CreateRecipeResponse
): E.Either<AppError, Recipe> => {
  return buildRecipeFromRecipeResponse(res.createRecipe);
};
