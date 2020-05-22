import {
  isFoodstuffResponseValue,
  FoodstuffResponseValue,
  foodstuffFromResponseValue,
  responseValueFromFoodstuff,
} from '../../foodstuffs/responses/foodstuffResponse';
import {
  FamilyMemberResponseValue,
  isFamilyMemberResponseValue,
  familyMemberFromResponseValue,
  responseValueFromFamilyMember,
} from '../../familyMembers/responses/familyMemberResponse';
import FoodAllergyHistory, {
  makeFoodAllergyHistory,
  FoodAllergyHistoryID,
} from '../../../../domain/models/foodAllergyHistory';

export type FoodAllergyHistoryResponseValue = {
  id: string;
  familyMember: FamilyMemberResponseValue;
  foodstuff: FoodstuffResponseValue;
};

type FoodAllergyHistoryResponse = {
  foodAllergyHistory: FoodAllergyHistoryResponseValue;
};

export default FoodAllergyHistoryResponse;

export const isFoodAllergyHisotoryResponseValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is FoodAllergyHistoryResponseValue => {
  if (value == null || typeof value !== 'object') {
    return false;
  }

  const { id, familyMember, foodstuff } = value;
  return (
    typeof id === 'string' &&
    isFamilyMemberResponseValue(familyMember) &&
    isFoodstuffResponseValue(foodstuff)
  );
};

export const isFoodAllergyHistoryResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
): value is FoodAllergyHistoryResponse => {
  if (value == null) {
    return false;
  }

  if (typeof value !== 'object') {
    return false;
  }

  const { foodAllergyHistory } = value;
  if (typeof foodAllergyHistory !== 'object') {
    return false;
  }

  return isFoodAllergyHisotoryResponseValue(foodAllergyHistory);
};

export const foodAllergyHistoryFromResponseValue = (
  value: FoodAllergyHistoryResponseValue
): FoodAllergyHistory => {
  const { id, familyMember, foodstuff } = value;
  return makeFoodAllergyHistory({
    id: id as FoodAllergyHistoryID,
    familyMember: familyMemberFromResponseValue(familyMember),
    foodstuff: foodstuffFromResponseValue(foodstuff),
  });
};

export const foodAllergyHistoryFromResponse = (
  response: FoodAllergyHistoryResponse
): FoodAllergyHistory =>
  foodAllergyHistoryFromResponseValue(response.foodAllergyHistory);

export const responseValueFromfoodAllergyHistory = (
  foodAllergyHistory: FoodAllergyHistory
): FoodAllergyHistoryResponseValue => ({
  id: foodAllergyHistory.id,
  familyMember: responseValueFromFamilyMember(foodAllergyHistory.familyMember),
  foodstuff: responseValueFromFoodstuff(foodAllergyHistory.foodstuff),
});

export const responseFromfoodAllergyHistory = (
  foodAllergyHistory: FoodAllergyHistory
): FoodAllergyHistoryResponse => ({
  foodAllergyHistory: responseValueFromfoodAllergyHistory(foodAllergyHistory),
});
