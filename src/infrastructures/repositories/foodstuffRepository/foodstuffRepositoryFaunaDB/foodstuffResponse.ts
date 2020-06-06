import * as E from 'fp-ts/lib/Either';
import { Foodstuff, makeFoodstuff } from '../../../../domain/models/foodstuff';
import AppError from '../../../../errors/AppError';
import { isFoodstuffCategory } from '../../../../domain/models/foodstuffCategory';
import Nutrient, { isNutrient } from '../../../../domain/models/nutrient';

export default interface FoodstuffResponse {
  readonly _id: number;
  readonly foodstuffID: string;
  readonly name: string;
  readonly category: string;
  readonly nutrients: string[];
}

export const buildFoodstuffFromFoodstuffResponse = (
  res: FoodstuffResponse
): E.Either<AppError, Foodstuff> => {
  if (isFoodstuffCategory(res.category) && res.nutrients.every(isNutrient)) {
    return E.right(
      makeFoodstuff({
        id: res.foodstuffID,
        name: res.name,
        category: res.category,
        nutrients: res.nutrients as Nutrient[],
      })
    );
  }
  return E.left(new AppError('graphql/invalid_response'));
};
