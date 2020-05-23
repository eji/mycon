import { container, DependencyContainer } from 'tsyringe';
import * as restm from 'typed-rest-client/RestClient';
import FoodstuffRepository from './domain/repositories/foodstuffRepository';
import {
  foodstuffRepository,
  inMemoryFoodstuffRepository,
  inMemoryRecipeRepository,
  recipeRepository,
  familyMemberRepository,
  inMemoryFamilyMemberRepository,
  dailyMealRepository,
  inMemoryDailyMealRepository,
  inMemoryFoodAllergyHistoryRepository,
  foodAllergyHistoryRepository,
  appServerFoodstuffRepository,
  restmRestClient,
  appServerFamilyMemberRepository,
  appServerRecipeRepository,
  appServerFoodAllergyHistoryRepository,
  appServerDailyMealRepository,
} from './types/diTypes';
import FoodstuffRepositoryInMemory from './infrastructures/repositories/foodstuffRepository/foodstuffRepositoryInMemory';
import SaveFoodstuffUseCase from './domain/useCases/saveFoodstuffUseCase';
import RecipeRepositoryInMemory from './infrastructures/repositories/recipeRepository/recipeRepositoryInMemory';
import RecipeRepository from './domain/repositories/recipeRepository';
import SaveRecipeUseCase from './domain/useCases/saveRecipeUseCase';
import FamilyMemberRepository from './domain/repositories/familyMemberRepository';
import FamilyMemberRepositoryInMemory from './infrastructures/repositories/familyMemberRepository/familyMemberRepositoryInMemory';
import SaveFamilyMemberUseCase from './domain/useCases/saveFamilyMemberUseCase';
import SaveDailyMealUseCase from './domain/useCases/saveDailyMealUseCase';
import DailyMealRepository from './domain/repositories/dailyMealRepository';
import DailyMealRepositoryInMemory from './infrastructures/repositories/dailyMealRepository/dailyMealRepositoryInMemory';
import FoodAllergyHistoryRepositoryInMemory from './infrastructures/repositories/foodAllergyHistoryRepository/foodAllergyHistoryRepositoryInMemory';
import FoodAllergyHistoryRepository from './domain/repositories/foodAllergyHistoryRepository';
import SaveFoodAllergyHistoryUseCase from './domain/useCases/saveFoodAllergyHistoryUseCase';
import GetAllFoodstuffsUseCase from './domain/useCases/getAllFoodstuffsUseCase';
import isBrowser from './utils/isBrowser';
import RestClient from './drivers/restClient';
import FoodstuffRepositoryAppServer from './infrastructures/repositories/foodstuffRepository/foodstuffRepositoryAppServer';
import GetAllFamilyMembersUseCase from './domain/useCases/getAllFamilyMembersUseCase';
import FamilyMemberRepositoryAppServer from './infrastructures/repositories/familyMemberRepository/familyMemberRepositoryAppServer';
import RecipeRepositoryAppServer from './infrastructures/repositories/recipeRepository/recipeRepositoryAppServer';
import FoodAllergyHistoryRepositoryAppServer from './infrastructures/repositories/foodAllergyHistoryRepository/foodAllergyHistoryRepositoryAppServer';
import GetAllFoodAllergyHistoriesUseCase from './domain/useCases/getAllFoodAllergyHistoriesUseCase';
import GetAllDailyMealsUseCase from './domain/useCases/getAllDailyMealsUseCase';
import DailyMealRepositoryAppServer from './infrastructures/repositories/dailyMealRepository/dailyMealRepositoryAppServer';
import apiUrl from './api/apiUrl';

const diConfig = (): void => {
  container.register<FoodstuffRepository>(foodstuffRepository, {
    useToken: isBrowser()
      ? appServerFoodstuffRepository
      : inMemoryFoodstuffRepository,
  });

  container.register<RecipeRepository>(recipeRepository, {
    useToken: isBrowser()
      ? appServerRecipeRepository
      : inMemoryRecipeRepository,
  });

  container.register<FamilyMemberRepository>(familyMemberRepository, {
    useToken: isBrowser()
      ? appServerFamilyMemberRepository
      : inMemoryFamilyMemberRepository,
  });

  container.register<DailyMealRepository>(dailyMealRepository, {
    useToken: isBrowser()
      ? appServerDailyMealRepository
      : inMemoryDailyMealRepository,
  });

  container.register<FoodAllergyHistoryRepository>(
    foodAllergyHistoryRepository,
    {
      useToken: isBrowser()
        ? appServerFoodAllergyHistoryRepository
        : inMemoryFoodAllergyHistoryRepository,
    }
  );

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
    inMemoryDailyMealRepository,
    new DailyMealRepositoryInMemory()
  );

  container.registerInstance(
    inMemoryFoodAllergyHistoryRepository,
    new FoodAllergyHistoryRepositoryInMemory()
  );

  /* rest client */

  container.registerInstance(
    restmRestClient,
    // TODO: 直すこと
    new restm.RestClient('MyConClient', apiUrl)
  );

  /* appServer repository */

  container.registerInstance(
    appServerFoodstuffRepository,
    new FoodstuffRepositoryAppServer(
      new RestClient(container.resolve(restmRestClient), '/api/foodstuffs')
    )
  );

  container.registerInstance(
    appServerRecipeRepository,
    new RecipeRepositoryAppServer(
      new RestClient(container.resolve(restmRestClient), '/api/recipes')
    )
  );

  container.registerInstance(
    appServerFamilyMemberRepository,
    new FamilyMemberRepositoryAppServer(
      new RestClient(container.resolve(restmRestClient), '/api/family_members')
    )
  );

  container.registerInstance(
    appServerFoodAllergyHistoryRepository,
    new FoodAllergyHistoryRepositoryAppServer(
      new RestClient(
        container.resolve(restmRestClient),
        '/food_allergy_histories'
      )
    )
  );

  container.registerInstance(
    appServerDailyMealRepository,
    new DailyMealRepositoryAppServer(
      new RestClient(container.resolve(restmRestClient), '/api/daily_meals')
    )
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

  container.register<SaveDailyMealUseCase>(SaveDailyMealUseCase, {
    useFactory: (
      dependencyContainer: DependencyContainer
    ): SaveDailyMealUseCase => {
      const repos = dependencyContainer.resolve<DailyMealRepository>(
        dailyMealRepository
      );
      return new SaveDailyMealUseCase(repos);
    },
  });

  container.register<SaveFoodAllergyHistoryUseCase>(
    SaveFoodAllergyHistoryUseCase,
    {
      useFactory: (
        dependencyContainer: DependencyContainer
      ): SaveFoodAllergyHistoryUseCase => {
        const repos = dependencyContainer.resolve<FoodAllergyHistoryRepository>(
          foodAllergyHistoryRepository
        );
        return new SaveFoodAllergyHistoryUseCase(repos);
      },
    }
  );

  container.register<GetAllFoodstuffsUseCase>(GetAllFoodstuffsUseCase, {
    useFactory: (
      dependencyContainer: DependencyContainer
    ): GetAllFoodstuffsUseCase => {
      const repos = dependencyContainer.resolve<FoodstuffRepository>(
        foodstuffRepository
      );
      return new GetAllFoodstuffsUseCase(repos);
    },
  });

  container.register<GetAllFamilyMembersUseCase>(GetAllFamilyMembersUseCase, {
    useFactory: (
      dependencyContainer: DependencyContainer
    ): GetAllFamilyMembersUseCase => {
      const repos = dependencyContainer.resolve<FamilyMemberRepository>(
        familyMemberRepository
      );
      return new GetAllFamilyMembersUseCase(repos);
    },
  });

  container.register<GetAllFoodAllergyHistoriesUseCase>(
    GetAllFoodAllergyHistoriesUseCase,
    {
      useFactory: (
        dependencyContainer: DependencyContainer
      ): GetAllFoodAllergyHistoriesUseCase => {
        const repos = dependencyContainer.resolve<FoodAllergyHistoryRepository>(
          foodAllergyHistoryRepository
        );
        return new GetAllFoodAllergyHistoriesUseCase(repos);
      },
    }
  );

  container.register<GetAllDailyMealsUseCase>(GetAllDailyMealsUseCase, {
    useFactory: (
      dependencyContainer: DependencyContainer
    ): GetAllDailyMealsUseCase => {
      const repos = dependencyContainer.resolve<DailyMealRepository>(
        dailyMealRepository
      );
      return new GetAllDailyMealsUseCase(repos);
    },
  });
};

export default diConfig;
