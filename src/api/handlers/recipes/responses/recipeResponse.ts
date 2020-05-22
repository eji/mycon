import Recipe, { makeRecipe, RecipeID } from '../../../../domain/models/recipe';
import {
  valueToRecipeIngredient,
  RecipeIngredientResponseValue,
  isRecipeIngredientResponseValue,
  responseValueFromRecipeIngredient,
} from '../../../commons/recipeIngredientResponseValue';

export type RecipeResponseValue = {
  id: string;
  name: string;
  ingredients: RecipeIngredientResponseValue[];
};

type RecipeResponse = {
  recipe: RecipeResponseValue;
};

export default RecipeResponse;

export const isRecipeResponseValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is RecipeResponseValue => {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  const { id, name, ingredients } = value;
  return (
    typeof id === 'string' &&
    typeof name === 'string' &&
    Array.isArray(ingredients) &&
    ingredients.every(isRecipeIngredientResponseValue)
  );
};

export const isRecipeResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is RecipeResponse => {
  if (value == null) {
    return false;
  }

  if (typeof value !== 'object') {
    return false;
  }

  const { recipe } = value;
  if (typeof recipe !== 'object') {
    return false;
  }

  return isRecipeResponseValue(recipe);
};

export const recipeFromResponseValue = (value: RecipeResponseValue): Recipe => {
  const { id, name, ingredients } = value;
  return makeRecipe({
    id: id as RecipeID,
    name,
    ingredients: ingredients.map(valueToRecipeIngredient),
  });
};

export const recipeFromResponse = (response: RecipeResponse): Recipe =>
  recipeFromResponseValue(response.recipe);

export const responseValueFromRecipe = (
  recipe: Recipe
): RecipeResponseValue => ({
  id: recipe.id,
  name: recipe.name,
  ingredients: recipe.ingredients.map(responseValueFromRecipeIngredient),
});

export const responseFromRecipe = (recipe: Recipe): RecipeResponse => ({
  recipe: responseValueFromRecipe(recipe),
});
