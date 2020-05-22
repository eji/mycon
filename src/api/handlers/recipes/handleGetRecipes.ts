import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { ApiHandler } from '../handleRequest';
import BaseError from '../../../errors/baseError';
import RecipesResponse, {
  responseFromRecipes,
} from './responses/recipesResponse';
import GetAllRecipesUseCase from '../../../domain/useCases/getAllRecipesUseCase';

const handleGetRecipes: ApiHandler = (): TE.TaskEither<
  BaseError,
  RecipesResponse
> =>
  pipe(
    container.resolve<GetAllRecipesUseCase>(GetAllRecipesUseCase).execute(),
    TE.map(responseFromRecipes),
    TE.mapLeft((e) => {
      console.log(e);
      return e;
    })
  );

export default handleGetRecipes;
