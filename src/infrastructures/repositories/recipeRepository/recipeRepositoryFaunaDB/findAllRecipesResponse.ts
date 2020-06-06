import * as E from 'fp-ts/lib/Either';
import * as A from 'fp-ts/lib/Array';
import AppError from '../../../../errors/AppError';
import RecipeResponse, {
  buildRecipeFromRecipeResponse,
} from './recipeResponse';
import Recipe from '../../../../domain/models/recipe';

interface RecipesResponse {
  readonly recipes: {
    readonly data: RecipeResponse[];
  };
}

export default interface FindAllRecipesResponse {
  readonly findUserByID: RecipesResponse | null;
}

export interface FoundRecipesResponse {
  readonly findUserByID: RecipesResponse;
}

export const isFoundRecipesResponse = (
  res: FindAllRecipesResponse
): res is FoundRecipesResponse => res.findUserByID !== null;

export const buildRecipesFromFoundRecipesResponse = (
  res: FoundRecipesResponse
): E.Either<AppError, Recipe[]> =>
  A.array.sequence(E.either)(
    res.findUserByID.recipes.data.map(buildRecipeFromRecipeResponse)
  );
