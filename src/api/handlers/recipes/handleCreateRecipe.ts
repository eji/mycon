import { container } from 'tsyringe';
import { NowRequest } from '@now/node';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import * as A from 'fp-ts/lib/Array';
import { Foodstuff } from '../../../domain/models/foodstuff';
import BaseError from '../../../errors/baseError';
import { ApiHandler } from '../handleRequest';
import {
  getCreateRecipeRequest,
  CreatRecipeRequest,
} from './requests/createRecipeRequest';
import { makeRecipe, UnpersistedRecipe } from '../../../domain/models/recipe';
import SaveRecipeUseCase from '../../../domain/useCases/saveRecipeUseCase';
import RecipeResponse, { responseFromRecipe } from './responses/recipeResponse';
import GetAllFoodstuffsUseCase from '../../../domain/useCases/getAllFoodstuffsUseCase';
import NotFoundError from '../../../errors/repositoryErrors/queryErrors/notFoundError';
import { makeRecipeIngredient } from '../../../domain/models/recipeIngredient';

const findFoodstuff = (
  foodstuffs: Foodstuff[],
  foodstuffId: string
): E.Either<NotFoundError, Foodstuff> =>
  E.fromNullable(new NotFoundError())(
    foodstuffs.find((foodstuff) => foodstuff.id === foodstuffId)
  );

const handleCreateRecipe: ApiHandler = (
  request: NowRequest
): TE.TaskEither<BaseError, RecipeResponse> =>
  pipe(
    // TODO: 直すこと
    container
      .resolve<GetAllFoodstuffsUseCase>(GetAllFoodstuffsUseCase)
      .execute(),

    TE.chainEitherK(
      (
        foodstuffs
      ): E.Either<NotFoundError, [CreatRecipeRequest, Foodstuff[]]> =>
        pipe(
          getCreateRecipeRequest(request),
          E.map((req) => [req, foodstuffs])
        )
    ),

    TE.chainEitherK(
      ([input, foodstuffs]): E.Either<NotFoundError, UnpersistedRecipe> =>
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
