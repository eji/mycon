import {
  FoodstuffResponseValue,
  isFoodstuffResponseValue,
  responseValueFromFoodstuff,
  foodstuffFromResponseValue,
} from '../handlers/foodstuffs/responses/foodstuffResponse';
import RecipeIngredient, {
  makeRecipeIngredient,
} from '../../domain/models/recipeIngredient';

export type RecipeIngredientResponseValue = {
  foodstuff: FoodstuffResponseValue;
  quantity: string;
};

export const valueToRecipeIngredient = (
  value: RecipeIngredientResponseValue
): RecipeIngredient => {
  const { foodstuff, quantity } = value;
  return makeRecipeIngredient({
    foodstuff: foodstuffFromResponseValue(foodstuff),
    quantity,
  });
};

export const isRecipeIngredientResponseValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is RecipeIngredientResponseValue => {
  if (value == null) {
    return false;
  }

  const { foodstuff, quantity } = value;
  return (
    foodstuff != null &&
    isFoodstuffResponseValue(foodstuff) &&
    quantity != null &&
    typeof quantity === 'string'
  );
};

export const responseValueFromRecipeIngredient = (
  recipeIngredient: RecipeIngredient
): RecipeIngredientResponseValue => ({
  foodstuff: responseValueFromFoodstuff(recipeIngredient.foodstuff),
  quantity: recipeIngredient.quantity,
});
