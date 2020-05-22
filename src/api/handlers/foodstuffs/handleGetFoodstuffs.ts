import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import GetAllFoodstuffsUseCase from '../../../domain/useCases/getAllFoodstuffsUseCase';
import { ApiHandler } from '../handleRequest';
import BaseError from '../../../errors/baseError';
import FoodstuffsResponse from './responses/foodstuffsResponse';

const handleGetFoodstuffs: ApiHandler = (): TE.TaskEither<
  BaseError,
  FoodstuffsResponse
> =>
  pipe(
    container.resolve<GetAllFoodstuffsUseCase>(GetAllFoodstuffsUseCase),
    (useCase) => useCase.execute(),
    TE.map((foodstuffs) => ({
      foodstuffs: foodstuffs.map((foodstuff) => ({
        id: foodstuff.id,
        name: foodstuff.name,
        category: foodstuff.category,
        nutrients: Array.from(foodstuff.nutrients),
      })),
    }))
  );

export default handleGetFoodstuffs;
