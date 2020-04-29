import { TaskEither } from "fp-ts/lib/TaskEither";
import QueryError from "../../errors/repositoryErrors/queryError";
import CommandError from "../../errors/repositoryErrors/commandError";
import DailyMenu from "../models/dailyMenu";
import CalendarDate from "../models/calender/calenderDate";

export default interface DailyMenuRepository {
  findByCalendarDate(
    calendarDate: CalendarDate
  ): TaskEither<QueryError, DailyMenu>;
  saveValue(dailyMenu: DailyMenu): TaskEither<CommandError, boolean>;
}
