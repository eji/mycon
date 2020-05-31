import * as TE from 'fp-ts/lib/TaskEither';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import InMemoryStore from '../../../drivers/inMemoryStore';
import FamilyMember from '../../../domain/models/familyMember';
import FoodAllergyHistoryRepository from '../../../domain/repositories/foodAllergyHistoryRepository';
import FoodAllergyHistory, {
  FoodAllergyHistoryID,
  UnpersistedFoodAllergyHistory,
  makeFoodAllergyHistory,
} from '../../../domain/models/foodAllergyHistory';
import { Foodstuff } from '../../../domain/models/foodstuff';
import { genId } from '../../../domain/models/id';
import AppError from '../../../errors/AppError';

export default class FoodAllergyHistoryRepositoryInMemory
  implements FoodAllergyHistoryRepository {
  readonly store: InMemoryStore<FoodAllergyHistoryID, FoodAllergyHistory>;

  constructor(store?: InMemoryStore<FoodAllergyHistoryID, FoodAllergyHistory>) {
    this.store =
      store || new InMemoryStore<FoodAllergyHistoryID, FoodAllergyHistory>();
  }

  all = (): TE.TaskEither<AppError, FoodAllergyHistory[]> =>
    TE.right(this.store.values());

  findAllByFoodstuff = (
    foodstuff: Foodstuff
  ): TE.TaskEither<AppError, FoodAllergyHistory[]> => {
    return pipe(
      this.store.values(),
      A.filter((history) => history.foodstuff.equals(foodstuff)),
      TE.right
    );
  };

  findAllByFamilyMember = (
    familyMember: FamilyMember
  ): TE.TaskEither<AppError, FoodAllergyHistory[]> => {
    return pipe(
      this.store.values(),
      A.filter((history) => history.familyMember.equals(familyMember)),
      TE.right
    );
  };

  saveValue = (
    foodAllergyHistory: FoodAllergyHistory | UnpersistedFoodAllergyHistory
  ): TE.TaskEither<AppError, FoodAllergyHistory> => {
    const newFoodAllergyHistory = makeFoodAllergyHistory({
      id: foodAllergyHistory.id || genId(),
      familyMember: foodAllergyHistory.familyMember,
      foodstuff: foodAllergyHistory.foodstuff,
    });
    this.store.set(newFoodAllergyHistory.id, newFoodAllergyHistory);
    return TE.right(newFoodAllergyHistory);
  };

  saveValues = (
    foodAllergyHistories: (FoodAllergyHistory | UnpersistedFoodAllergyHistory)[]
  ): TE.TaskEither<AppError, FoodAllergyHistory[]> =>
    A.array.sequence(TE.taskEither)(foodAllergyHistories.map(this.saveValue));
}
