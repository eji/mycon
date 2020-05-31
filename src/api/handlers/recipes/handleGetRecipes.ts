import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { ApiHandler } from '../handleRequest';
import RecipesResponse, {
  responseFromRecipes,
} from './responses/recipesResponse';
import GetAllRecipesUseCase from '../../../domain/useCases/getAllRecipesUseCase';
import inspect from '../../../utils/taskEitherHelpers';
import AppError from '../../../errors/AppError';

const handleGetRecipes: ApiHandler = (): TE.TaskEither<
  AppError,
  RecipesResponse
> =>
  pipe(
    container.resolve<GetAllRecipesUseCase>(GetAllRecipesUseCase).execute(),
    TE.map(responseFromRecipes),
    TE.mapLeft(inspect(console.error))
  );

export default handleGetRecipes;
