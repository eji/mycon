import { TaskEither, fromOption, right } from "fp-ts/lib/TaskEither";
import QueryError from "../../../errors/repositoryErrors/queryError";
import CommandError from "../../../errors/repositoryErrors/commandError";
import InMemoryStore from "../../../drivers/InMemoryStore";
import NotFoundError from "../../../errors/repositoryErrors/queryErrors/notFoundError";
import DailyMenuRepository from "../../../domain/repositories/dailyMenuRepository";
import DailyMenu from "../../../domain/models/dailyMenu";

export default class DailyMenuRepositoryInMemory
  implements DailyMenuRepository {
  readonly store: InMemoryStore<Date, DailyMenu>;

  constructor(store?: InMemoryStore<Date, DailyMenu>) {
    this.store = store || new InMemoryStore<Date, DailyMenu>();
  }

  findByDate(date: Date): TaskEither<QueryError, DailyMenu> {
    const recipesOfTheDay = this.store.get(date);
    return fromOption(() => new NotFoundError())(recipesOfTheDay);
  }

  saveValue(dailyMenu: DailyMenu): TaskEither<CommandError, boolean> {
    this.store.set(dailyMenu.date, dailyMenu);
    return right(true);
  }
}
