import { TaskEither } from 'fp-ts/lib/TaskEither';
import DailyMeal from '../models/dailyMeal';
import CalendarDate from '../models/calender/calendarDate';
import AppError from '../../errors/AppError';

export default interface DailyMealRepository {
  all(): TaskEither<AppError, DailyMeal[]>;

  findByCalendarDate(
    calendarDate: CalendarDate
  ): TaskEither<AppError, DailyMeal>;

  saveValue(dailyMeal: DailyMeal): TaskEither<AppError, DailyMeal>;
}
