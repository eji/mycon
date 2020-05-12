import { TaskEither } from 'fp-ts/lib/TaskEither';
import QueryError from '../../errors/repositoryErrors/queryError';
import CommandError from '../../errors/repositoryErrors/commandError';
import DailyMeal from '../models/dailyMeal';
import CalendarDate from '../models/calender/calendarDate';

export default interface DailyMealRepository {
  findByCalendarDate(
    calendarDate: CalendarDate
  ): TaskEither<QueryError, DailyMeal>;
  saveValue(dailyMeal: DailyMeal): TaskEither<CommandError, unknown>;
}
