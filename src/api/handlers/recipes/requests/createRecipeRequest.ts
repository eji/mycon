import * as E from 'fp-ts/lib/Either';
import { NowRequest } from '@now/node';
import InvalidRequestError from '../../../../errors/requestErrors/clientErrors/invalidRequestError';
import { UnpersistedRecipe } from '../../../../domain/models/recipe';
import {
  RecipeIngredientRequestValue,
  isRecipeIngredientRequestValue,
  requestFromRecipeIngredient,
} from '../../../commons/recipeIngredientRequestValue';

export type CreatRecipeRequest = {
  name: string;
  ingredients: RecipeIngredientRequestValue[];
};

export const isCreateRecipeRequest = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
): input is CreatRecipeRequest => {
  if (input == null || typeof input !== 'object') {
    return false;
  }

  const { name, ingredients } = input;

  return (
    typeof name === 'string' &&
    Array.isArray(ingredients) &&
    ingredients.every(isRecipeIngredientRequestValue)
  );
};

export const requestFromRecipe = (
  recipe: UnpersistedRecipe
): CreatRecipeRequest => ({
  name: recipe.name,
  ingredients: recipe.ingredients.map(requestFromRecipeIngredient),
});

export const getCreateRecipeRequest = (
  request: NowRequest
): E.Either<InvalidRequestError, CreatRecipeRequest> => {
  if (isCreateRecipeRequest(request.body)) {
    return E.right(request.body);
  }
  return E.left(new InvalidRequestError());
};
