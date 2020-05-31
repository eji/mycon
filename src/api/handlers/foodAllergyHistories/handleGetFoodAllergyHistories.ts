import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { ApiHandler } from '../handleRequest';
import FoodAllergyHistoriesResponse, {
  responseFromFoodAllergyHistories,
} from './responses/foodAllergyHistoriesResponse';
import GetAllFoodAllergyHistoriesUseCase from '../../../domain/useCases/getAllFoodAllergyHistoriesUseCase';
import AppError from '../../../errors/AppError';

const handleGetFoodAllergyHistories: ApiHandler = (): TE.TaskEither<
  AppError,
  FoodAllergyHistoriesResponse
> =>
  pipe(
    container
      .resolve<GetAllFoodAllergyHistoriesUseCase>(
        GetAllFoodAllergyHistoriesUseCase
      )
      .execute(),
    TE.map(responseFromFoodAllergyHistories)
  );

export default handleGetFoodAllergyHistories;
