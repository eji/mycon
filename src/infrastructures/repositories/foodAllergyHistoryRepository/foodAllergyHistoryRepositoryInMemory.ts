import * as TE from 'fp-ts/lib/TaskEither';
import * as O from 'fp-ts/lib/Option';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import QueryError from '../../../errors/repositoryErrors/queryError';
import CommandError from '../../../errors/repositoryErrors/commandError';
import InMemoryStore from '../../../drivers/InMemoryStore';
import FamilyMember from '../../../domain/models/familyMember';
import FoodAllergyHistoryRepository from '../../../domain/repositories/foodAllergyHistoryRepository';
import FoodAllergyHistory, {
  FoodAllergyHistoryID,
} from '../../../domain/models/foodAllergyHistory';
import { Foodstuff } from '../../../domain/models/foodstuff';

export default class FoodAllergyHistoryRepositoryInMemory
  implements FoodAllergyHistoryRepository {
  readonly store: InMemoryStore<FoodAllergyHistoryID, FoodAllergyHistory[]>;

  constructor(
    store?: InMemoryStore<FoodAllergyHistoryID, FoodAllergyHistory[]>
  ) {
    this.store =
      store || new InMemoryStore<FoodAllergyHistoryID, FoodAllergyHistory[]>();
  }

  findAllByFoodstuff = (
    foodstuff: Foodstuff
  ): TE.TaskEither<QueryError, FoodAllergyHistory[]> => {
    return pipe(
      this.store.values(),
      A.flatten,
      A.filter((history) => history.foodstuff.equals(foodstuff)),
      TE.right
    );
  };

  findAllByFamilyMember = (
    familyMember: FamilyMember
  ): TE.TaskEither<QueryError, FoodAllergyHistory[]> => {
    return pipe(
      this.store.values(),
      A.flatten,
      A.filter((history) => history.familyMember.equals(familyMember)),
      TE.right
    );
  };

  saveValue = (
    foodAllergyHistory: FoodAllergyHistory
  ): TE.TaskEither<CommandError, unknown> =>
    pipe(
      this.store.get(foodAllergyHistory.id),
      O.getOrElse<FoodAllergyHistory[]>(() => [] as FoodAllergyHistory[]),
      (histories) =>
        this.store.set(foodAllergyHistory.id, [
          ...histories,
          foodAllergyHistory,
        ]),
      TE.right
    );

  saveValues = (
    foodAllergyHistories: FoodAllergyHistory[]
  ): TE.TaskEither<CommandError, unknown> =>
    TE.right(foodAllergyHistories.forEach(this.saveValue));
}
