import { TaskEither } from 'fp-ts/lib/TaskEither';
import { Foodstuff, UnpersistedFoodstuff } from '../models/foodstuff';
import AppError from '../../errors/AppError';

export default interface FoodstuffRepository {
  all(): TaskEither<AppError, Foodstuff[]>;
  saveValue(
    foodstuff: Foodstuff | UnpersistedFoodstuff
  ): TaskEither<AppError, Foodstuff>;
  saveValues(
    foodstuffs: (Foodstuff | UnpersistedFoodstuff)[]
  ): TaskEither<AppError, Foodstuff[]>;
}
