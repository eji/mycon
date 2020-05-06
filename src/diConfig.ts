import { container, DependencyContainer } from 'tsyringe';
import FoodstuffRepository from './domain/repositories/foodstuffRepository';
import {
  foodstuffRepository,
  inMemoryFoodstuffRepository,
  inMemoryRecipeRepository,
  recipeRepository,
  familyMemberRepository,
  inMemoryFamilyMemberRepository,
  dailyMenuRepository,
  inMemoryDailyMenuRepository,
} from './types/diTypes';
import FoodstuffRepositoryInMemory from './infrastructures/repositories/foodstuffRepository/foodstuffRepositoryInMemory';
import SaveFoodstuffUseCase from './domain/useCases/saveFoodstuffUseCase';
import RecipeRepositoryInMemory from './infrastructures/repositories/recipeRepository/recipeRepositoryInMemory';
import RecipeRepository from './domain/repositories/recipeRepository';
import SaveRecipeUseCase from './domain/useCases/saveRecipeUseCase';
import FamilyMemberRepository from './domain/repositories/familyMemberRepository';
import FamilyMemberRepositoryInMemory from './infrastructures/repositories/familyMemberRepository/familyMemberRepositoryInMemory';
import SaveFamilyMemberUseCase from './domain/useCases/saveFamilyMemberUseCase';
import SaveDailyMenuUseCase from './domain/useCases/saveDailyMenuUseCase';
import DailyMenuRepository from './domain/repositories/dailyMenuRepository';
import DailyMenuRepositoryInMemory from './infrastructures/repositories/dailyMenuRepository/dailyMenuRepositoryInMemory';

const diConfig = (): void => {
  container.register<FoodstuffRepository>(foodstuffRepository, {
    useToken: inMemoryFoodstuffRepository,
  });

  container.register<RecipeRepository>(recipeRepository, {
    useToken: inMemoryRecipeRepository,
  });

  container.register<FamilyMemberRepository>(familyMemberRepository, {
    useToken: inMemoryFamilyMemberRepository,
  });

  container.register<DailyMenuRepository>(dailyMenuRepository, {
    useToken: inMemoryDailyMenuRepository,
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

  container.registerInstance(
    inMemoryFamilyMemberRepository,
    new FamilyMemberRepositoryInMemory()
  );

  container.registerInstance(
    inMemoryDailyMenuRepository,
    new DailyMenuRepositoryInMemory()
  );

  /* use cases */
  container.register<SaveFoodstuffUseCase>(SaveFoodstuffUseCase, {
    useFactory: (
      dependencyContainer: DependencyContainer
    ): SaveFoodstuffUseCase => {
      const repos = dependencyContainer.resolve<FoodstuffRepository>(
        foodstuffRepository
      );
      return new SaveFoodstuffUseCase(repos);
    },
  });

  container.register<SaveRecipeUseCase>(SaveRecipeUseCase, {
    useFactory: (
      dependencyContainer: DependencyContainer
    ): SaveRecipeUseCase => {
      const repos = dependencyContainer.resolve<RecipeRepository>(
        recipeRepository
      );
      return new SaveRecipeUseCase(repos);
    },
  });

  container.register<SaveFamilyMemberUseCase>(SaveFamilyMemberUseCase, {
    useFactory: (
      dependencyContainer: DependencyContainer
    ): SaveFamilyMemberUseCase => {
      const repos = dependencyContainer.resolve<FamilyMemberRepository>(
        familyMemberRepository
      );
      return new SaveFamilyMemberUseCase(repos);
    },
  });

  container.register<SaveDailyMenuUseCase>(SaveDailyMenuUseCase, {
    useFactory: (
      dependencyContainer: DependencyContainer
    ): SaveDailyMenuUseCase => {
      const repos = dependencyContainer.resolve<DailyMenuRepository>(
        dailyMenuRepository
      );
      return new SaveDailyMenuUseCase(repos);
    },
  });
};

export default diConfig;
