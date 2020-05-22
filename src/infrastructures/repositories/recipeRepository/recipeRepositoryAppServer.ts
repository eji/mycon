import * as TE from 'fp-ts/lib/TaskEither';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import RecipeRepository from '../../../domain/repositories/recipeRepository';
import Recipe, {
  RecipeID,
  UnpersistedRecipe,
} from '../../../domain/models/recipe';
import RestClient from '../../../drivers/restClient';
import RecipesResponse, {
  recipesFromResponse,
} from '../../../api/handlers/recipes/responses/recipesResponse';
import RecipeResponse, {
  recipeFromResponse,
} from '../../../api/handlers/recipes/responses/recipeResponse';
import BaseError from '../../../errors/baseError';
import { isPersisted } from '../../../types/unpersisted';
import * as createReq from '../../../api/handlers/recipes/requests/createRecipeRequest';
import * as replaceReq from '../../../api/handlers/recipes/requests/replaceRecipeRequest';

export default class RecipeRepositoryAppServer implements RecipeRepository {
  constructor(readonly restClient: RestClient) {}

  all = (): TE.TaskEither<BaseError, Recipe[]> =>
    pipe(this.restClient.all<RecipesResponse>(), TE.map(recipesFromResponse));

  findById = (id: RecipeID): TE.TaskEither<BaseError, Recipe> =>
    pipe(this.restClient.show<RecipeResponse>(id), TE.map(recipeFromResponse));

  saveValue = (
    recipe: Recipe | UnpersistedRecipe
  ): TE.TaskEither<BaseError, Recipe> =>
    isPersisted<Recipe>(recipe)
      ? this.replaceValue(recipe)
      : this.createValue(recipe);

  saveValues = (
    recipes: (Recipe | UnpersistedRecipe)[]
  ): TE.TaskEither<BaseError, Recipe[]> =>
    A.array.sequence(TE.taskEither)(recipes.map(this.saveValue));

  private createValue = (
    recipe: UnpersistedRecipe
  ): TE.TaskEither<BaseError, Recipe> =>
    pipe(
      createReq.requestFromRecipe(recipe),
      (request) =>
        this.restClient.create<createReq.CreatRecipeRequest, RecipeResponse>(
          request
        ),
      TE.map(recipeFromResponse)
    );

  private replaceValue = (recipe: Recipe): TE.TaskEither<BaseError, Recipe> =>
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
