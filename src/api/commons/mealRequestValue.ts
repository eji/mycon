import Meal from '../../domain/models/meal';

export type MealRequestValue = {
  id: string;
  name: string;
  recipeIds: string[];
};

export const isMealRequestValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
): input is MealRequestValue => {
  if (input == null || typeof input !== 'object') {
    return false;
  }

  const { id, name, recipeIds } = input;
  return (
    typeof id === 'string' &&
    typeof name === 'string' &&
    Array.isArray(recipeIds)
  );
};

export const requestValueFromMeal = (meal: Meal): MealRequestValue => ({
  id: meal.id,
  name: meal.name,
  recipeIds: meal.recipes.map((r) => r.id),
});
