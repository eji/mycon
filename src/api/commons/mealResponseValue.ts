import {
  RecipeResponseValue,
  recipeFromResponseValue,
  isRecipeResponseValue,
  responseValueFromRecipe,
} from '../handlers/recipes/responses/recipeResponse';
import Meal, { makeMeal } from '../../domain/models/meal';

export type MealResponseValue = {
  id: string;
  name: string;
  recipes: RecipeResponseValue[];
};

export const mealFromResponseValue = (value: MealResponseValue): Meal => {
  const { id, name, recipes } = value;
  return makeMeal({
    id,
    name,
    recipes: recipes.map(recipeFromResponseValue),
  });
};

export const isMealResponseValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is MealResponseValue => {
  if (value == null) {
    return false;
  }

  const { id, name, recipes } = value;
  return (
    typeof id === 'string' &&
    typeof name === 'string' &&
    Array.isArray(recipes) &&
    recipes.every(isRecipeResponseValue)
  );
};

export const responseValueFromMeal = (meal: Meal): MealResponseValue => ({
  id: meal.id,
  name: meal.name,
  recipes: meal.recipes.map(responseValueFromRecipe),
});
