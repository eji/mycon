import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import RecipeRepository from '../../../domain/repositories/recipeRepository';
import Recipe, { UnpersistedRecipe } from '../../../domain/models/recipe';
import RestClient from '../../../drivers/restClient';
import RecipesResponse, {
  recipesFromResponse,
} from '../../../api/handlers/recipes/responses/recipesResponse';
import RecipeResponse, {
  recipeFromResponse,
} from '../../../api/handlers/recipes/responses/recipeResponse';
import { isPersisted } from '../../../types/unpersisted';
import * as createReq from '../../../api/handlers/recipes/requests/createRecipeRequest';
import * as replaceReq from '../../../api/handlers/recipes/requests/replaceRecipeRequest';
import AppError from '../../../errors/AppError';

export default class RecipeRepositoryAppServer implements RecipeRepository {
  constructor(readonly restClient: RestClient) {}

  all = (): TE.TaskEither<AppError, Recipe[]> =>
    pipe(this.restClient.all<RecipesResponse>(), TE.map(recipesFromResponse));

  saveValue = (
    recipe: Recipe | UnpersistedRecipe
  ): TE.TaskEither<AppError, Recipe> =>
    isPersisted<Recipe>(recipe)
      ? this.replaceValue(recipe)
      : this.createValue(recipe);

  private createValue = (
    recipe: UnpersistedRecipe
  ): TE.TaskEither<AppError, Recipe> =>
    pipe(
      createReq.requestFromRecipe(recipe),
      (request) =>
        this.restClient.create<createReq.CreatRecipeRequest, RecipeResponse>(
          request
        ),
      TE.map(recipeFromResponse)
    );

  private replaceValue = (recipe: Recipe): TE.TaskEither<AppError, Recipe> =>
    pipe(
      replaceReq.requestFromRecipe(recipe),
      (request) =>
        this.restClient.replace<
          replaceReq.ReplaceRecipeRequest,
          RecipeResponse
        >(request),
      TE.map(recipeFromResponse)
    );
}
