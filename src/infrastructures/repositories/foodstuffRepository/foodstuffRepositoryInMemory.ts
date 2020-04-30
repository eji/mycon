import { TaskEither, right } from 'fp-ts/lib/TaskEither';
import { Task, of } from 'fp-ts/lib/Task';
import { Option, none } from 'fp-ts/lib/Option';
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

  all(): TaskEither<QueryError, Foodstuff[]> {
    return right(this.store.values());
  }

  saveValue(foodstuff: Foodstuff): Task<Option<CommandError>> {
    return this.saveValues([foodstuff]);
  }

  saveValues(foodstuffs: Foodstuff[]): Task<Option<CommandError>> {
    foodstuffs.forEach((foodstuff) => this.store.set(foodstuff.id, foodstuff));
    return of(none);
  }
}
