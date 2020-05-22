import RecipeIngredient from '../../domain/models/recipeIngredient';

export type RecipeIngredientRequestValue = {
  foodstuffId: string;
  quantity: string;
};

export const isRecipeIngredientRequestValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
): input is RecipeIngredientRequestValue => {
  if (input == null || typeof input !== 'object') {
    return false;
  }

  const { foodstuffId, quantity } = input;
  return typeof foodstuffId === 'string' && typeof quantity === 'string';
};

export const requestFromRecipeIngredient = (
  ingredient: RecipeIngredient
): RecipeIngredientRequestValue => ({
  foodstuffId: ingredient.foodstuff.id,
  quantity: ingredient.quantity,
});
