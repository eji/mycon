import Nutrient, { isNutrient } from '../../../../domain/models/nutrient';
import FoodstuffCategory, {
  isFoodstuffCategory,
} from '../../../../domain/models/foodstuffCategory';
import {
  makeFoodstuff,
  FoodstuffID,
  Foodstuff,
} from '../../../../domain/models/foodstuff';

export type FoodstuffResponseValue = {
  id: string;
  name: string;
  nutrients: string[];
  category: string;
};

type FoodstuffResponse = {
  foodstuff: FoodstuffResponseValue;
};

export default FoodstuffResponse;

export const isFoodstuffResponseValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is FoodstuffResponseValue => {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  const { id, name, nutrients, category } = value;
  return (
    typeof id === 'string' &&
    typeof name === 'string' &&
    Array.isArray(nutrients) &&
    nutrients.every(isNutrient) &&
    isFoodstuffCategory(category)
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isFoodstuffResponse = (value: any): value is FoodstuffResponse => {
  if (value == null) {
    return false;
  }

  if (typeof value !== 'object') {
    return false;
  }

  const { foodstuff } = value;
  if (typeof foodstuff !== 'object') {
    return false;
  }

  return isFoodstuffResponseValue(foodstuff);
};

export const foodstuffFromResponseValue = (
  value: FoodstuffResponseValue
): Foodstuff => {
  const { id, name, category, nutrients } = value;
  return makeFoodstuff({
    id: id as FoodstuffID,
    name,
    category: category as FoodstuffCategory,
    nutrients: nutrients as Nutrient[],
  });
};

export const foodstuffFromResponse = (response: FoodstuffResponse): Foodstuff =>
  foodstuffFromResponseValue(response.foodstuff);

export const responseValueFromFoodstuff = (
  foodstuff: Foodstuff
): FoodstuffResponseValue => ({
  id: foodstuff.id,
  name: foodstuff.name,
  category: foodstuff.category,
  nutrients: Array.from(foodstuff.nutrients),
});
