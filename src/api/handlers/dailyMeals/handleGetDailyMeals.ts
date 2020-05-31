import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { ApiHandler } from '../handleRequest';
import DailyMealsResponse, {
  responseFromDailyMeals,
} from './responses/dailyMealsResponse';
import GetAllDailyMealsUseCase from '../../../domain/useCases/getAllDailyMealsUseCase';
import AppError from '../../../errors/AppError';

const handleGetDailyMeals: ApiHandler = (): TE.TaskEither<
  AppError,
  DailyMealsResponse
> =>
  pipe(
    container
      .resolve<GetAllDailyMealsUseCase>(GetAllDailyMealsUseCase)
      .execute(),
    TE.map(responseFromDailyMeals)
  );

export default handleGetDailyMeals;
