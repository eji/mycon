import { TaskEither } from 'fp-ts/lib/TaskEither';
import DailyMeal from '../models/dailyMeal';
import CalendarDate from '../models/calender/calendarDate';
import BaseError from '../../errors/baseError';

export default interface DailyMealRepository {
  all(): TaskEither<BaseError, DailyMeal[]>;

  findByCalendarDate(
    calendarDate: CalendarDate
  ): TaskEither<BaseError, DailyMeal>;

  saveValue(dailyMeal: DailyMeal): TaskEither<BaseError, DailyMeal>;
}
