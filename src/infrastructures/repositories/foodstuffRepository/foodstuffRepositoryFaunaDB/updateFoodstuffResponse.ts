import * as E from 'fp-ts/lib/Either';
import { Foodstuff } from '../../../../domain/models/foodstuff';
import AppError from '../../../../errors/AppError';
import FoodstuffResponse, {
  buildFoodstuffFromFoodstuffResponse,
} from './foodstuffResponse';

export default interface UpdateFoodstuffResponse {
  readonly updateFoodstuff: FoodstuffResponse;
}

export const buildFoodstuffFromUpdateFoodstuffResponse = (
  res: UpdateFoodstuffResponse
): E.Either<AppError, Foodstuff> => {
  return buildFoodstuffFromFoodstuffResponse(res.updateFoodstuff);
};
