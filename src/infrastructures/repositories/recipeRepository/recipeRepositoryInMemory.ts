import * as TE from 'fp-ts/lib/TaskEither';
import RecipeRepository from '../../../domain/repositories/recipeRepository';
import QueryError from '../../../errors/repositoryErrors/queryError';
import Recipe, { RecipeID } from '../../../domain/models/recipe';
import CommandError from '../../../errors/repositoryErrors/commandError';
import InMemoryStore from '../../../drivers/InMemoryStore';
import NotFoundError from '../../../errors/repositoryErrors/queryErrors/notFoundError';

export default class RecipeRepositoryInMemory implements RecipeRepository {
  readonly store: InMemoryStore<RecipeID, Recipe>;

  constructor(store?: InMemoryStore<RecipeID, Recipe>) {
    this.store = store || new InMemoryStore<RecipeID, Recipe>();
  }

  all = (): TE.TaskEither<QueryError, Recipe[]> => {
    return TE.right(this.store.values());
  };

  findById = (id: RecipeID): TE.TaskEither<QueryError, Recipe> => {
    const recipe = this.store.get(id);
    return TE.fromOption(() => new NotFoundError())(recipe);
  };

  saveValue = (recipe: Recipe): TE.TaskEither<CommandError, unknown> => {
    return TE.right(this.store.set(recipe.id, recipe));
  };

  saveValues = (recipes: Recipe[]): TE.TaskEither<CommandError, unknown> => {
    return TE.right(
      recipes.forEach((recipe) => this.store.set(recipe.id, recipe))
    );
  };
}
