import * as TE from 'fp-ts/lib/TaskEither';
import RecipeRepository from '../../../domain/repositories/recipeRepository';
import Recipe, {
  RecipeID,
  UnpersistedRecipe,
  makeRecipe,
} from '../../../domain/models/recipe';
import InMemoryStore from '../../../drivers/inMemoryStore';
import { genId } from '../../../domain/models/id';
import AppError from '../../../errors/AppError';

export default class RecipeRepositoryInMemory implements RecipeRepository {
  readonly store: InMemoryStore<RecipeID, Recipe>;

  constructor(store?: InMemoryStore<RecipeID, Recipe>) {
    this.store = store || new InMemoryStore<RecipeID, Recipe>();
  }

  all = (): TE.TaskEither<AppError, Recipe[]> => {
    return TE.right(this.store.values());
  };

  saveValue = (
    recipe: Recipe | UnpersistedRecipe
  ): TE.TaskEither<AppError, Recipe> => {
    const newRecipe = makeRecipe({
      id: recipe.id || genId(),
      name: recipe.name,
      ingredients: recipe.ingredients,
    });
    this.store.set(newRecipe.id, newRecipe);
    return TE.right(newRecipe);
  };
}
