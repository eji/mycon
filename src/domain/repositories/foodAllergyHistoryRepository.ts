import * as TE from 'fp-ts/lib/TaskEither';
import FoodAllergyHistory, {
  UnpersistedFoodAllergyHistory,
} from '../models/foodAllergyHistory';
import { Foodstuff } from '../models/foodstuff';
import FamilyMember from '../models/familyMember';
import BaseError from '../../errors/baseError';

export default interface FoodAllergyHistoryRepository {
  all: () => TE.TaskEither<BaseError, FoodAllergyHistory[]>;

  findAllByFoodstuff: (
    foodstuff: Foodstuff
  ) => TE.TaskEither<BaseError, FoodAllergyHistory[]>;

  findAllByFamilyMember: (
    familyMember: FamilyMember
  ) => TE.TaskEither<BaseError, FoodAllergyHistory[]>;

  saveValue: (
    foodAllergyHistory: FoodAllergyHistory | UnpersistedFoodAllergyHistory
  ) => TE.TaskEither<BaseError, FoodAllergyHistory>;

  saveValues: (
    foodAllergyHistories: (FoodAllergyHistory | UnpersistedFoodAllergyHistory)[]
  ) => TE.TaskEither<BaseError, FoodAllergyHistory[]>;
}
