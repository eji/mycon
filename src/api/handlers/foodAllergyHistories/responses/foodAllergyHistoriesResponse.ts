import {
  FoodAllergyHistoryResponseValue,
  isFoodAllergyHisotoryResponseValue,
  foodAllergyHistoryFromResponseValue,
  responseValueFromfoodAllergyHistory,
} from './foodAllergyHistoryResponse';
import FoodAllergyHistory from '../../../../domain/models/foodAllergyHistory';

type FoodAllergyHistoriesResponse = {
  foodAllergyHistories: FoodAllergyHistoryResponseValue[];
};

export default FoodAllergyHistoriesResponse;

export const isFoodAllergyHistoriesResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is FoodAllergyHistoriesResponse => {
  if (value == null) {
    return false;
  }

  if (typeof value !== 'object') {
    return false;
  }

  const { foodAllergyHistories } = value;
  if (typeof foodAllergyHistories !== 'object') {
    return false;
  }

  return (
    Array.isArray(foodAllergyHistories) &&
    foodAllergyHistories.every(isFoodAllergyHisotoryResponseValue)
  );
};

export const foodAllergyHistoriesFromResponse = (
  response: FoodAllergyHistoriesResponse
): FoodAllergyHistory[] =>
  response.foodAllergyHistories.map(foodAllergyHistoryFromResponseValue);

export const responseFromFoodAllergyHistories = (
  foodAllergyHistories: FoodAllergyHistory[]
): FoodAllergyHistoriesResponse => ({
  foodAllergyHistories: foodAllergyHistories.map(
    responseValueFromfoodAllergyHistory
  ),
});
