import * as TE from 'fp-ts/lib/TaskEither';
import * as A from 'fp-ts/lib/Array';
import FoodstuffRepository from '../../../domain/repositories/foodstuffRepository';
import {
  Foodstuff,
  FoodstuffID,
  UnpersistedFoodstuff,
  makeFoodstuff,
} from '../../../domain/models/foodstuff';
import foodstuffSeeds from '../../../data/seeds/foodstuffs';
import { genId } from '../../../domain/models/id';
import InMemoryStore from '../../../drivers/inMemoryStore';
import AppError from '../../../errors/AppError';

export default class FoodstuffRepositoryInMemory
  implements FoodstuffRepository {
  readonly store: InMemoryStore<FoodstuffID, Foodstuff>;

  constructor(store?: InMemoryStore<FoodstuffID, Foodstuff>) {
    this.store = store || new InMemoryStore<FoodstuffID, Foodstuff>();
    // TODO: 後でこれを消すこと
    this.saveValues(foodstuffSeeds);
  }

  all(): TE.TaskEither<AppError, Foodstuff[]> {
    return TE.right(this.store.values());
  }

  saveValue = (
    foodstuff: Foodstuff | UnpersistedFoodstuff
  ): TE.TaskEither<AppError, Foodstuff> => {
    const id = foodstuff.id || genId();
    const newFoodstuff = makeFoodstuff({
      id,
      name: foodstuff.name,
      category: foodstuff.category,
      nutrients: Array.from(foodstuff.nutrients),
    });
    this.store.set(id, newFoodstuff);
    return TE.right(newFoodstuff);
  };

  saveValues = (
    foodstuffs: (Foodstuff | UnpersistedFoodstuff)[]
  ): TE.TaskEither<AppError, Foodstuff[]> => {
    return A.array.sequence(TE.taskEither)(foodstuffs.map(this.saveValue));
  };
}
