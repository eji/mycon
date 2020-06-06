import * as E from 'fp-ts/lib/Either';
import { Foodstuff } from '../../../../domain/models/foodstuff';
import AppError from '../../../../errors/AppError';
import FoodstuffResponse, {
  buildFoodstuffFromFoodstuffResponse,
} from './foodstuffResponse';

export default interface CreateFoodstuffResponse {
  readonly createFoodstuff: FoodstuffResponse;
}

export const buildFoodstuffFromCreateFoodstuffResponse = (
  res: CreateFoodstuffResponse
): E.Either<AppError, Foodstuff> => {
  return buildFoodstuffFromFoodstuffResponse(res.createFoodstuff);
};
