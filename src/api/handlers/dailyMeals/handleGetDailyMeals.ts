import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { ApiHandler } from '../handleRequest';
import BaseError from '../../../errors/baseError';
import DailyMealsResponse, {
  responseFromDailyMeals,
} from './responses/dailyMealsResponse';
import GetAllDailyMealsUseCase from '../../../domain/useCases/getAllDailyMealsUseCase';

const handleGetDailyMeals: ApiHandler = (): TE.TaskEither<
  BaseError,
  DailyMealsResponse
> =>
  pipe(
    container
      .resolve<GetAllDailyMealsUseCase>(GetAllDailyMealsUseCase)
      .execute(),
    TE.map(responseFromDailyMeals)
  );

export default handleGetDailyMeals;
