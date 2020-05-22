import * as E from 'fp-ts/lib/Either';
import { NowRequest } from '@now/node';
import InvalidRequestError from '../../../../errors/requestErrors/clientErrors/invalidRequestError';
import Recipe from '../../../../domain/models/recipe';
import {
  RecipeIngredientRequestValue,
  requestFromRecipeIngredient,
} from '../../../commons/recipeIngredientRequestValue';

export type ReplaceRecipeRequestBody = {
  name: string;
  ingredients: RecipeIngredientRequestValue[];
};

export type ReplaceRecipeRequest = ReplaceRecipeRequestBody & { id: string };

export const isReplaceRecipeRequestBody = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
): input is ReplaceRecipeRequestBody => {
  if (input == null || typeof input !== 'object') {
    return false;
  }

  const { name } = input;
  return typeof name === 'string';
};

export const requestFromRecipe = (recipe: Recipe): ReplaceRecipeRequest => ({
  id: recipe.id,
  name: recipe.name,
  ingredients: recipe.ingredients.map(requestFromRecipeIngredient),
});

export const getReplaceRecipeRequest = (
  request: NowRequest
): E.Either<InvalidRequestError, ReplaceRecipeRequest> => {
  const { id } = request.query;
  if (id == null || typeof id !== 'string') {
    return E.left(new InvalidRequestError());
  }

  if (!isReplaceRecipeRequestBody(request.body)) {
    return E.left(new InvalidRequestError());
  }

  return E.right({
    ...request.body,
    id,
  });
};
