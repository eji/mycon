import { container } from 'tsyringe';
import { NowRequest } from '@now/node';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import * as E from 'fp-ts/lib/Either';
import SaveFoodstuffUseCase from '../../../domain/useCases/saveFoodstuffUseCase';
import { makeFoodstuff } from '../../../domain/models/foodstuff';
import BaseError from '../../../errors/baseError';
import FoodstuffResponse from './responses/foodstuffResponse';
import { ApiHandler } from '../handleRequest';
import { getCreateFoodstuffRequest } from './requests/createFoodstuffRequest';
import inspect from '../../../utils/taskEitherHelpers';

const handleCreateFoodstuff: ApiHandler = (
  request: NowRequest
): TE.TaskEither<BaseError, FoodstuffResponse> =>
  pipe(
    getCreateFoodstuffRequest(request),
    E.map((input) => makeFoodstuff(input)),
    TE.fromEither,
    TE.chain((inputFoodstuff) =>
      container
        .resolve<SaveFoodstuffUseCase>(SaveFoodstuffUseCase)
        .execute({ foodstuff: inputFoodstuff })
    ),
    TE.map((addedFoodstuff) => ({
      foodstuff: {
        id: addedFoodstuff.id,
        name: addedFoodstuff.name,
        category: addedFoodstuff.category,
        nutrients: Array.from(addedFoodstuff.nutrients),
      },
    })),
    TE.mapLeft(inspect((val) => console.error(val)))
  );

export default handleCreateFoodstuff;
