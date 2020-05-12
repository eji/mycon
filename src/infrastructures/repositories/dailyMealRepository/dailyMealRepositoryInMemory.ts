import { TaskEither, fromOption, right } from 'fp-ts/lib/TaskEither';
import QueryError from '../../../errors/repositoryErrors/queryError';
import CommandError from '../../../errors/repositoryErrors/commandError';
import InMemoryStore from '../../../drivers/InMemoryStore';
import NotFoundError from '../../../errors/repositoryErrors/queryErrors/notFoundError';
import DailyMealRepository from '../../../domain/repositories/dailyMealRepository';
import DailyMeal from '../../../domain/models/dailyMeal';
import CalendarDate from '../../../domain/models/calender/calendarDate';

export default class DailyMealRepositoryInMemory
  implements DailyMealRepository {
  readonly store: InMemoryStore<CalendarDate, DailyMeal>;

  constructor(store?: InMemoryStore<CalendarDate, DailyMeal>) {
    this.store = store || new InMemoryStore<CalendarDate, DailyMeal>();
  }

  findByCalendarDate(
    calendarDate: CalendarDate
  ): TaskEither<QueryError, DailyMeal> {
    const recipesOfTheDay = this.store.get(calendarDate);
    return fromOption(() => new NotFoundError())(recipesOfTheDay);
  }

  saveValue(dailyMeal: DailyMeal): TaskEither<CommandError, boolean> {
    this.store.set(dailyMeal.calendarDate, dailyMeal);
    return right(true);
  }
}
