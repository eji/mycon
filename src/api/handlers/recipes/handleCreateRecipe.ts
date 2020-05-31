import { container } from 'tsyringe';
import { NowRequest } from '@now/node';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import * as A from 'fp-ts/lib/Array';
import { Foodstuff } from '../../../domain/models/foodstuff';
import { ApiHandler } from '../handleRequest';
import {
  getCreateRecipeRequest,
  CreatRecipeRequest,
} from './requests/createRecipeRequest';
import { makeRecipe, UnpersistedRecipe } from '../../../domain/models/recipe';
import SaveRecipeUseCase from '../../../domain/useCases/saveRecipeUseCase';
import RecipeResponse, { responseFromRecipe } from './responses/recipeResponse';
import GetAllFoodstuffsUseCase from '../../../domain/useCases/getAllFoodstuffsUseCase';
import { makeRecipeIngredient } from '../../../domain/models/recipeIngredient';
import AppError from '../../../errors/AppError';

const findFoodstuff = (
  foodstuffs: Foodstuff[],
  foodstuffId: string
): E.Either<AppError, Foodstuff> =>
  E.fromNullable(new AppError('repos/not_found_error'))(
    foodstuffs.find((foodstuff) => foodstuff.id === foodstuffId)
  );

const handleCreateRecipe: ApiHandler = (
  request: NowRequest
): TE.TaskEither<AppError, RecipeResponse> =>
  pipe(
    // TODO: 直すこと
    container
      .resolve<GetAllFoodstuffsUseCase>(GetAllFoodstuffsUseCase)
      .execute(),

    TE.chainEitherK(
      (foodstuffs): E.Either<AppError, [CreatRecipeRequest, Foodstuff[]]> =>
        pipe(
          getCreateRecipeRequest(request),
          E.map((req) => [req, foodstuffs])
        )
    ),

    TE.chainEitherK(
      ([input, foodstuffs]): E.Either<AppError, UnpersistedRecipe> =>
        pipe(
          A.array.sequence(E.either)(
            input.ingredients.map((i) =>
              pipe(
                findFoodstuff(foodstuffs, i.foodstuffId),
                E.map((foodstuff) =>
                  makeRecipeIngredient({
                    foodstuff,
                    quantity: i.quantity,
                  })
                )
              )
            )
          ),
          E.map((ingredients) =>
            makeRecipe({
              name: input.name,
              ingredients,
            })
          )
        )
    ),

    TE.chain((inputRecipe) =>
      container
        .resolve<SaveRecipeUseCase>(SaveRecipeUseCase)
        .execute({ recipe: inputRecipe })
    ),
    TE.map(responseFromRecipe)
  );

export default handleCreateRecipe;
