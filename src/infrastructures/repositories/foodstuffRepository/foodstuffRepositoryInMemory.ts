import * as TE from 'fp-ts/lib/TaskEither';
import QueryError from '../../../errors/repositoryErrors/queryError';
import CommandError from '../../../errors/repositoryErrors/commandError';
import InMemoryStore from '../../../drivers/InMemoryStore';
import FoodstuffRepository from '../../../domain/repositories/foodstuffRepository';
import { Foodstuff, FoodstuffID } from '../../../domain/models/foodstuff';

export default class FoodstuffRepositoryInMemory
  implements FoodstuffRepository {
  readonly store: InMemoryStore<FoodstuffID, Foodstuff>;

  constructor(store?: InMemoryStore<FoodstuffID, Foodstuff>) {
    this.store = store || new InMemoryStore<FoodstuffID, Foodstuff>();
  }

  all(): TE.TaskEither<QueryError, Foodstuff[]> {
    return TE.right(this.store.values());
  }

  saveValue(foodstuff: Foodstuff): TE.TaskEither<CommandError, unknown> {
    return this.saveValues([foodstuff]);
  }

  saveValues(foodstuffs: Foodstuff[]): TE.TaskEither<CommandError, unknown> {
    return TE.right(
      foodstuffs.forEach((foodstuff) => this.store.set(foodstuff.id, foodstuff))
    );
  }
}
