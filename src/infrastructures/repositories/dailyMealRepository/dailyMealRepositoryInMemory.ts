import * as TE from 'fp-ts/lib/TaskEither';
import InMemoryStore from '../../../drivers/inMemoryStore';
import NotFoundError from '../../../errors/repositoryErrors/queryErrors/notFoundError';
import DailyMealRepository from '../../../domain/repositories/dailyMealRepository';
import DailyMeal from '../../../domain/models/dailyMeal';
import CalendarDate from '../../../domain/models/calender/calendarDate';
import BaseError from '../../../errors/baseError';

export default class DailyMealRepositoryInMemory
  implements DailyMealRepository {
  readonly store: InMemoryStore<CalendarDate, DailyMeal>;

  constructor(store?: InMemoryStore<CalendarDate, DailyMeal>) {
    this.store = store || new InMemoryStore<CalendarDate, DailyMeal>();
  }

  all = (): TE.TaskEither<BaseError, DailyMeal[]> =>
    TE.right(this.store.values());

  findByCalendarDate = (
    calendarDate: CalendarDate
  ): TE.TaskEither<BaseError, DailyMeal> => {
    const recipesOfTheDay = this.store.get(calendarDate);
    return TE.fromOption(() => new NotFoundError())(recipesOfTheDay);
  };

  saveValue = (dailyMeal: DailyMeal): TE.TaskEither<BaseError, DailyMeal> => {
    this.store.set(dailyMeal.calendarDate, dailyMeal);
    return TE.right(dailyMeal);
  };
}
