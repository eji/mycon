import * as E from 'fp-ts/lib/Either';
import { NowRequest } from '@now/node';
import Nutrient, { isNutrient } from '../../../../domain/models/nutrient';
import FoodstuffCategory, {
  isFoodstuffCategory,
} from '../../../../domain/models/foodstuffCategory';
import { UnpersistedFoodstuff } from '../../../../domain/models/foodstuff';
import InvalidRequestError from '../../../../errors/requestErrors/clientErrors/invalidRequestError';

export type CreatFoodstuffRequest = {
  name: string;
  nutrients: Nutrient[];
  category: FoodstuffCategory;
};

export const isCreateFoodstuffRequest = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
): input is CreatFoodstuffRequest => {
  if (input == null || typeof input !== 'object') {
    return false;
  }

  const { name, nutrients, category } = input;

  return (
    typeof name === 'string' &&
    isFoodstuffCategory(category) &&
    Array.isArray(nutrients) &&
    nutrients.every(isNutrient)
  );
};

export const requestFromFoodstuff = (
  foodstuff: UnpersistedFoodstuff
): CreatFoodstuffRequest => ({
  name: foodstuff.name,
  category: foodstuff.category,
  nutrients: Array.from(foodstuff.nutrients),
});

export const getCreateFoodstuffRequest = (
  request: NowRequest
): E.Either<InvalidRequestError, CreatFoodstuffRequest> => {
  if (isCreateFoodstuffRequest(request.body)) {
    return E.right(request.body);
  }
  return E.left(new InvalidRequestError());
};
