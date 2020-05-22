import * as E from 'fp-ts/lib/Either';
import { NowRequest } from '@now/node';
import Nutrient, { isNutrient } from '../../../../domain/models/nutrient';
import FoodstuffCategory, {
  isFoodstuffCategory,
} from '../../../../domain/models/foodstuffCategory';
import { Foodstuff } from '../../../../domain/models/foodstuff';
import InvalidRequestError from '../../../../errors/requestErrors/clientErrors/invalidRequestError';

export type ReplaceFoodstuffRequestBody = {
  name: string;
  nutrients: Nutrient[];
  category: FoodstuffCategory;
};

export type ReplaceFoodstuffRequest = ReplaceFoodstuffRequestBody & {
  id: string;
};

export const isReplaceFoodstuffRequestBody = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input: any
): input is ReplaceFoodstuffRequestBody => {
  if (input == null || typeof input !== 'object') {
    return false;
  }

  const { name, nutrients, category } = input;

  return (
    typeof name === 'string' &&
    Array.isArray(nutrients) &&
    typeof category === 'string' &&
    isFoodstuffCategory(category) &&
    nutrients.every(isNutrient)
  );
};

export const requestFromFoodstuff = (
  foodstuff: Foodstuff
): ReplaceFoodstuffRequest => ({
  id: foodstuff.id,
  name: foodstuff.name,
  category: foodstuff.category,
  nutrients: Array.from(foodstuff.nutrients),
});

export const getReplaceFoodstuffRequest = (
  request: NowRequest
): E.Either<InvalidRequestError, ReplaceFoodstuffRequest> => {
  const { id } = request.query;
  if (id == null || typeof id !== 'string') {
    return E.left(new InvalidRequestError());
  }

  if (!isReplaceFoodstuffRequestBody(request.body)) {
    return E.left(new InvalidRequestError());
  }

  return E.right({
    id,
    name: request.body.name,
    category: request.body.category,
    nutrients: request.body.nutrients,
  });
};
