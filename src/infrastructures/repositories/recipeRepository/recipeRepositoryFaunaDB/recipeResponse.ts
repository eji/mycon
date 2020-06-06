import * as E from 'fp-ts/lib/Either';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import AppError from '../../../../errors/AppError';
import Recipe, { makeRecipe } from '../../../../domain/models/recipe';
import RecipeIngredientResponse, {
  buildRecipeIngredientFromRecipeIngredientResponse,
} from './recipeIngredientResponse';

export default interface RecipeResponse {
  readonly _id: string;
  readonly recipeID: string;
  readonly name: string;
  readonly ingredients: {
    readonly data: RecipeIngredientResponse[];
  };
}

export const buildRecipeFromRecipeResponse = (
  res: RecipeResponse
): E.Either<AppError, Recipe> =>
  pipe(
    A.array.sequence(E.either)(
      res.ingredients.data.map(
        buildRecipeIngredientFromRecipeIngredientResponse
      )
    ),
    E.map((recipeIngredients) =>
      makeRecipe({
        id: res.recipeID,
        name: res.name,
        ingredients: recipeIngredients,
      })
    )
  );
