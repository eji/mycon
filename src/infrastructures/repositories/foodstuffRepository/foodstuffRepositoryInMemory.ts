import { TaskEither, right } from 'fp-ts/lib/TaskEither';
import { Task, of } from 'fp-ts/lib/Task';
import { Option, none } from 'fp-ts/lib/Option';
import QueryError from '../../../errors/repositoryErrors/queryError';
import CommandError from '../../../errors/repositoryErrors/commandError';
import InMemoryStore from '../../../drivers/InMemoryStore';
import FoodstuffRepository from '../../../domain/repositories/foodstuffRepository';
import Foodstuff from '../../../domain/models/foodstuff';

export default class FoodstuffRepositoryInMemory
  implements FoodstuffRepository {
  readonly store: InMemoryStore<Foodstuff, Foodstuff>;

  constructor(store?: InMemoryStore<Foodstuff, Foodstuff>) {
    this.store = store || new InMemoryStore<Foodstuff, Foodstuff>();
  }

  all(): TaskEither<QueryError, string[]> {
    return right(this.store.values());
  }

  saveValue(foodstuff: string): Task<Option<CommandError>> {
    return this.saveValues([foodstuff]);
  }

  saveValues(foodstuffs: string[]): Task<Option<CommandError>> {
    foodstuffs.forEach((foodstuff) => this.store.set(foodstuff, foodstuff));
    return of(none);
  }
}
