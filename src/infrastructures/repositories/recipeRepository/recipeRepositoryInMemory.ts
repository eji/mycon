import { TaskEither, fromOption, right } from "fp-ts/lib/TaskEither";
import RecipeRepository from "../../../domain/repositories/recipeRepository";
import QueryError from "../../../errors/repositoryErrors/queryError";
import Recipe, { RecipeID } from "../../../domain/models/recipe";
import CommandError from "../../../errors/repositoryErrors/commandError";
import InMemoryStore from "../../../drivers/InMemoryStore";
import NotFoundError from "../../../errors/repositoryErrors/queryErrors/notFoundError";

export default class RecipeRepositoryInMemory implements RecipeRepository {
  readonly store: InMemoryStore<RecipeID, Recipe>;

  constructor(store?: InMemoryStore<RecipeID, Recipe>) {
    this.store = store || new InMemoryStore<RecipeID, Recipe>();
  }

  findById(id: RecipeID): TaskEither<QueryError, Recipe> {
    const recipe = this.store.get(id);
    return fromOption(() => new NotFoundError())(recipe);
  }

  saveValue(recipe: Recipe): TaskEither<CommandError, boolean> {
    this.store.set(recipe.id, recipe);
    return right(true);
  }

  saveValues(recipes: Recipe[]): TaskEither<CommandError, boolean> {
    recipes.forEach((recipe) => this.store.set(recipe.id, recipe));
    return right(true);
  }
}
