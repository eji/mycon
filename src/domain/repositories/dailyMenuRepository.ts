import { TaskEither } from "fp-ts/lib/TaskEither";
import QueryError from "../../errors/repositoryErrors/queryError";
import CommandError from "../../errors/repositoryErrors/commandError";
import DailyMenu from "../models/dailyMenu";

export default interface DailyMenuRepository {
  findByDate(date: Date): TaskEither<QueryError, DailyMenu>;
  saveValue(dailyMenu: DailyMenu): TaskEither<CommandError, boolean>;
}
