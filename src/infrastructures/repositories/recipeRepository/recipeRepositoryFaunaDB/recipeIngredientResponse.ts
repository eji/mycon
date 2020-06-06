import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/pipeable';
import AppError from '../../../../errors/AppError';
import FoodstuffResponse, {
  buildFoodstuffFromFoodstuffResponse,
} from '../../foodstuffRepository/foodstuffRepositoryFaunaDB/foodstuffResponse';
import RecipeIngredient, {
  makeRecipeIngredient,
} from '../../../../domain/models/recipeIngredient';

export default interface RecipeIngredientResponse {
  readonly _id: string;
  readonly quantity: string;
  readonly foodstuff: FoodstuffResponse;
}

export const buildRecipeIngredientFromRecipeIngredientResponse = (
  res: RecipeIngredientResponse
): E.Either<AppError, RecipeIngredient> =>
  pipe(
    buildFoodstuffFromFoodstuffResponse(res.foodstuff),
    E.map((foodstuff) =>
      makeRecipeIngredient({
        foodstuff,
        quantity: res.quantity,
      })
    )
  );
