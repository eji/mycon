import * as TE from 'fp-ts/lib/TaskEither';
import QueryError from '../../errors/repositoryErrors/queryError';
import CommandError from '../../errors/repositoryErrors/commandError';
import FoodAllergyHistory from '../models/foodAllergyHistory';
import { Foodstuff } from '../models/foodstuff';
import FamilyMember from '../models/familyMember';

export default interface FoodAllergyHistoryRepository {
  findAllByFoodstuff(
    foodstuff: Foodstuff
  ): TE.TaskEither<QueryError, FoodAllergyHistory[]>;
  findAllByFamilyMember(
    familyMember: FamilyMember
  ): TE.TaskEither<QueryError, FoodAllergyHistory[]>;
  saveValue(
    foodAllergyHistory: FoodAllergyHistory
  ): TE.TaskEither<CommandError, unknown>;
  saveValues(
    foodAllergyHistories: FoodAllergyHistory[]
  ): TE.TaskEither<CommandError, unknown>;
}
