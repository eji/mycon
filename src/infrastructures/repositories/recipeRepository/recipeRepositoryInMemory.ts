import * as TE from 'fp-ts/lib/TaskEither';
import * as A from 'fp-ts/lib/Array';
import RecipeRepository from '../../../domain/repositories/recipeRepository';
import QueryError from '../../../errors/repositoryErrors/queryError';
import Recipe, {
  RecipeID,
  UnpersistedRecipe,
  makeRecipe,
} from '../../../domain/models/recipe';
import CommandError from '../../../errors/repositoryErrors/commandError';
import InMemoryStore from '../../../drivers/inMemoryStore';
import NotFoundError from '../../../errors/repositoryErrors/queryErrors/notFoundError';
import { genId } from '../../../domain/models/id';

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

  saveValue = (
    recipe: Recipe | UnpersistedRecipe
  ): TE.TaskEither<CommandError, Recipe> => {
    const newRecipe = makeRecipe({
      id: recipe.id || genId(),
      name: recipe.name,
      ingredients: recipe.ingredients,
    });
    this.store.set(newRecipe.id, newRecipe);
    return TE.right(newRecipe);
  };

  saveValues = (
    recipes: (Recipe | UnpersistedRecipe)[]
  ): TE.TaskEither<CommandError, Recipe[]> =>
    A.array.sequence(TE.taskEither)(recipes.map(this.saveValue));
}
