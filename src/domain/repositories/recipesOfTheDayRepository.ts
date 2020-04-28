import { TaskEither } from "fp-ts/lib/TaskEither";
import QueryError from "../../errors/repositoryErrors/queryError";
import CommandError from "../../errors/repositoryErrors/commandError";
import RecipesOfTheDay from "../models/recipesOfTheDay";

export default interface RecipesOfTheDayRepository {
  findByDate(date: Date): TaskEither<QueryError, RecipesOfTheDay>;
  saveValue(
    recipesOfTheDay: RecipesOfTheDay
  ): TaskEither<CommandError, boolean>;
}
