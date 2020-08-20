import * as TE from 'fp-ts/lib/TaskEither';
import DailyMealRepository from '../../../domain/repositories/dailyMealRepository';
import DailyMeal from '../../../domain/models/dailyMeal';
import CalendarDate from '../../../domain/models/calender/calendarDate';
import InMemoryStore from '../../../drivers/inMemoryStore';
import AppError from '../../../errors/AppError';

export default class DailyMealRepositoryInMemory
  implements DailyMealRepository {
  readonly store: InMemoryStore<CalendarDate, DailyMeal>;

  constructor(store?: InMemoryStore<CalendarDate, DailyMeal>) {
    this.store = store || new InMemoryStore<CalendarDate, DailyMeal>();
  }

  all = (): TE.TaskEither<AppError, DailyMeal[]> =>
    TE.right(this.store.values());

  saveValue = (dailyMeal: DailyMeal): TE.TaskEither<AppError, DailyMeal> => {
    this.store.set(dailyMeal.calendarDate, dailyMeal);
    return TE.right(dailyMeal);
  };
}
