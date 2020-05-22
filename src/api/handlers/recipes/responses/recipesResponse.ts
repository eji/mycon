import {
  RecipeResponseValue,
  isRecipeResponseValue,
  responseValueFromRecipe,
  recipeFromResponseValue,
} from './recipeResponse';
import Recipe from '../../../../domain/models/recipe';

type RecipesResponse = {
  recipes: RecipeResponseValue[];
};

export default RecipesResponse;

export const isRecipesResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is RecipesResponse => {
  if (value == null) {
    return false;
  }

  if (typeof value !== 'object') {
    return false;
  }

  const { foodstuffs: recipes } = value;
  if (typeof recipes !== 'object') {
    return false;
  }

  return Array.isArray(recipes) && recipes.every(isRecipeResponseValue);
};

export const recipesFromResponse = (response: RecipesResponse): Recipe[] =>
  response.recipes.map(recipeFromResponseValue);

export const responseFromRecipes = (recipes: Recipe[]): RecipesResponse => ({
  recipes: recipes.map(responseValueFromRecipe),
});
