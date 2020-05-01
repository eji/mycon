import { container, DependencyContainer } from 'tsyringe';
import FoodstuffRepository from './domain/repositories/foodstuffRepository';
import {
  foodstuffRepository,
  inMemoryFoodstuffRepository,
  inMemoryRecipeRepository,
  recipeRepository,
} from './types/diTypes';
import FoodstuffRepositoryInMemory from './infrastructures/repositories/foodstuffRepository/foodstuffRepositoryInMemory';
import AddFoodstuffUseCase from './domain/useCases/addFoodstuffUseCase';
import RecipeRepositoryInMemory from './infrastructures/repositories/recipeRepository/recipeRepositoryInMemory';
import RecipeRepository from './domain/repositories/recipeRepository';
import AddRecipeUseCase from './domain/useCases/addRecipeUseCase';

const diConfig = (): void => {
  container.register<FoodstuffRepository>(foodstuffRepository, {
    useToken: inMemoryFoodstuffRepository,
  });

  container.register<RecipeRepository>(recipeRepository, {
    useToken: inMemoryRecipeRepository,
  });

  /* in-memory repository */

  container.registerInstance(
    inMemoryFoodstuffRepository,
    new FoodstuffRepositoryInMemory()
  );

  container.registerInstance(
    inMemoryRecipeRepository,
    new RecipeRepositoryInMemory()
  );

  /* use cases */
  container.register<AddFoodstuffUseCase>(AddFoodstuffUseCase, {
    useFactory: (
      dependencyContainer: DependencyContainer
    ): AddFoodstuffUseCase => {
      const repos = dependencyContainer.resolve<FoodstuffRepository>(
        foodstuffRepository
      );
      return new AddFoodstuffUseCase(repos);
    },
  });

  container.register<AddRecipeUseCase>(AddRecipeUseCase, {
    useFactory: (
      dependencyContainer: DependencyContainer
    ): AddRecipeUseCase => {
      const repos = dependencyContainer.resolve<RecipeRepository>(
        recipeRepository
      );
      return new AddRecipeUseCase(repos);
    },
  });
};

export default diConfig;
