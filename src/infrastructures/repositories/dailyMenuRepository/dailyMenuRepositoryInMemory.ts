import { TaskEither, fromOption, right } from 'fp-ts/lib/TaskEither';
import QueryError from '../../../errors/repositoryErrors/queryError';
import CommandError from '../../../errors/repositoryErrors/commandError';
import InMemoryStore from '../../../drivers/InMemoryStore';
import NotFoundError from '../../../errors/repositoryErrors/queryErrors/notFoundError';
import DailyMenuRepository from '../../../domain/repositories/dailyMenuRepository';
import DailyMenu from '../../../domain/models/dailyMenu';
import CalendarDate from '../../../domain/models/calender/calendarDate';

export default class DailyMenuRepositoryInMemory
  implements DailyMenuRepository {
  readonly store: InMemoryStore<CalendarDate, DailyMenu>;

  constructor(store?: InMemoryStore<CalendarDate, DailyMenu>) {
    this.store = store || new InMemoryStore<CalendarDate, DailyMenu>();
  }

  findByCalendarDate(
    calendarDate: CalendarDate
  ): TaskEither<QueryError, DailyMenu> {
    const recipesOfTheDay = this.store.get(calendarDate);
    return fromOption(() => new NotFoundError())(recipesOfTheDay);
  }

  saveValue(dailyMenu: DailyMenu): TaskEither<CommandError, boolean> {
    this.store.set(dailyMenu.calendarDate, dailyMenu);
    return right(true);
  }
}
