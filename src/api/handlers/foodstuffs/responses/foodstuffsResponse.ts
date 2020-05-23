import {
  FoodstuffResponseValue,
  isFoodstuffResponseValue,
  foodstuffFromResponseValue,
} from './foodstuffResponse';
import { Foodstuff } from '../../../../domain/models/foodstuff';

type FoodstuffsResponse = {
  foodstuffs: FoodstuffResponseValue[];
};

export default FoodstuffsResponse;

export const isFoodstuffsResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is FoodstuffsResponse => {
  if (value == null) {
    return false;
  }

  if (typeof value !== 'object') {
    return false;
  }

  const { foodstuffs } = value;
  if (typeof foodstuffs !== 'object') {
    return false;
  }

  return (
    Array.isArray(foodstuffs) && foodstuffs.every(isFoodstuffResponseValue)
  );
};

export const foodstuffsFromResponse = (
  response: FoodstuffsResponse
): Foodstuff[] => response.foodstuffs.map(foodstuffFromResponseValue);
