import { container } from 'tsyringe';
import { NowRequest } from '@now/node';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import SaveFoodstuffUseCase from '../../../domain/useCases/saveFoodstuffUseCase';
import { makeFoodstuff, Foodstuff } from '../../../domain/models/foodstuff';
import FoodstuffResponse from './responses/foodstuffResponse';
import { ApiHandler } from '../handleRequest';
import { getReplaceFoodstuffRequest } from './requests/replaceFoodstuffRequest';
import AppError from '../../../errors/AppError';

const handleReplaceFoodstuff: ApiHandler = (
  request: NowRequest
): TE.TaskEither<AppError, FoodstuffResponse> =>
  pipe(
    getReplaceFoodstuffRequest(request),
    E.map((input) => makeFoodstuff(input) as Foodstuff),
    TE.fromEither,
    TE.chain((inputFoodstuff) =>
      container
        .resolve<SaveFoodstuffUseCase>(SaveFoodstuffUseCase)
        .execute({ foodstuff: inputFoodstuff })
    ),
    TE.map((updatedFoodstuff) => ({
      foodstuff: {
        id: updatedFoodstuff.id,
        name: updatedFoodstuff.name,
        category: updatedFoodstuff.category,
        nutrients: Array.from(updatedFoodstuff.nutrients),
      },
    }))
  );

export default handleReplaceFoodstuff;
