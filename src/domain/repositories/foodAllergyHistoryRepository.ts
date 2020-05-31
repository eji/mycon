import * as TE from 'fp-ts/lib/TaskEither';
import FoodAllergyHistory, {
  UnpersistedFoodAllergyHistory,
} from '../models/foodAllergyHistory';
import { Foodstuff } from '../models/foodstuff';
import FamilyMember from '../models/familyMember';
import AppError from '../../errors/AppError';

export default interface FoodAllergyHistoryRepository {
  all: () => TE.TaskEither<AppError, FoodAllergyHistory[]>;

  findAllByFoodstuff: (
    foodstuff: Foodstuff
  ) => TE.TaskEither<AppError, FoodAllergyHistory[]>;

  findAllByFamilyMember: (
    familyMember: FamilyMember
  ) => TE.TaskEither<AppError, FoodAllergyHistory[]>;

  saveValue: (
    foodAllergyHistory: FoodAllergyHistory | UnpersistedFoodAllergyHistory
  ) => TE.TaskEither<AppError, FoodAllergyHistory>;

  saveValues: (
    foodAllergyHistories: (FoodAllergyHistory | UnpersistedFoodAllergyHistory)[]
  ) => TE.TaskEither<AppError, FoodAllergyHistory[]>;
}
