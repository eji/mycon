import { TaskEither, fromOption, right } from "fp-ts/lib/TaskEither";
import QueryError from "../../../errors/repositoryErrors/queryError";
import CommandError from "../../../errors/repositoryErrors/commandError";
import InMemoryStore from "../../../drivers/InMemoryStore";
import NotFoundError from "../../../errors/repositoryErrors/queryErrors/notFoundError";
import RecipesOfTheDayRepository from "../../../domain/repositories/recipesOfTheDayRepository";
import RecipesOfTheDay from "../../../domain/models/recipesOfTheDay";

export default class RecipesOfTheDayRepositoryInMemory
  implements RecipesOfTheDayRepository {
  readonly store: InMemoryStore<Date, RecipesOfTheDay>;

  constructor(store?: InMemoryStore<Date, RecipesOfTheDay>) {
    this.store = store || new InMemoryStore<Date, RecipesOfTheDay>();
  }

  findByDate(date: Date): TaskEither<QueryError, RecipesOfTheDay> {
    const recipesOfTheDay = this.store.get(date);
    return fromOption(() => new NotFoundError())(recipesOfTheDay);
  }

  saveValue(
    recipesOfTheDay: RecipesOfTheDay
  ): TaskEither<CommandError, boolean> {
    this.store.set(recipesOfTheDay.date, recipesOfTheDay);
    return right(true);
  }
}
