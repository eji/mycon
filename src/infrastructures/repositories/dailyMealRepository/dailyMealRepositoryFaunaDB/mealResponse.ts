import * as E from 'fp-ts/lib/Either';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import AppError from '../../../../errors/AppError';
import RecipeResponse, {
  buildRecipeFromRecipeResponse,
} from '../../recipeRepository/recipeRepositoryFaunaDB/recipeResponse';
import Meal, { makeMeal } from '../../../../domain/models/meal';

export default interface MealResponse {
  readonly _id: string;
  readonly mealID: string;
  readonly name: string;
  readonly recipes: {
    readonly data: RecipeResponse[];
  };
}

export const buildMealFromMealResponse = (
  res: MealResponse
): E.Either<AppError, Meal> =>
  pipe(
    A.array.sequence(E.either)(
      res.recipes.data.map(buildRecipeFromRecipeResponse)
    ),
    E.map((recipes) =>
      makeMeal({
        id: res.mealID,
        name: res.name,
        recipes,
      })
    )
  );
