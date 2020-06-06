import * as E from 'fp-ts/lib/Either';
import * as A from 'fp-ts/lib/Array';
import { Foodstuff } from '../../../../domain/models/foodstuff';
import AppError from '../../../../errors/AppError';
import FoodstuffResponse, {
  buildFoodstuffFromFoodstuffResponse,
} from './foodstuffResponse';

interface FoodstuffsResponse {
  readonly foodstuffs: {
    readonly data: FoodstuffResponse[];
  };
}

export default interface FindAllFoodstuffsResponse {
  readonly findUserByID: FoodstuffsResponse | null;
}

export interface FoundFoodstuffsResponse {
  readonly findUserByID: FoodstuffsResponse;
}

export const isFoundFoodstuffsResponse = (
  res: FindAllFoodstuffsResponse
): res is FoundFoodstuffsResponse => res.findUserByID !== null;

export const buildFoodstuffsFromFoundFoodstuffsResponse = (
  res: FoundFoodstuffsResponse
): E.Either<AppError, Foodstuff[]> =>
  A.array.sequence(E.either)(
    res.findUserByID.foodstuffs.data.map(buildFoodstuffFromFoodstuffResponse)
  );
