import * as E from 'fp-ts/lib/Either';
import AppError from '../../../../errors/AppError';
import Recipe from '../../../../domain/models/recipe';
import RecipeResponse, {
  buildRecipeFromRecipeResponse,
} from './recipeResponse';

export default interface ReplaceRecipeResponse {
  readonly updateRecipe: RecipeResponse;
}

export const buildRecipeFromReplaceRecipeResponse = (
  res: ReplaceRecipeResponse
): E.Either<AppError, Recipe> => {
  return buildRecipeFromRecipeResponse(res.updateRecipe);
};
