import { container, DependencyContainer } from 'tsyringe';
import * as restm from 'typed-rest-client/RestClient';
import firebase from 'firebase';
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
  appUserContextToken as userContextToken,
  userRepositoryToken,
  inMemoryUserRepository,
  appServerUserRepository,
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
import GetAllRecipesUseCase from './domain/useCases/getAllRecipesUseCase';
import userContext from './app/contexts/userContext';
import SignedInService from './app/services/signedInService';
import UserRepository from './domain/repositories/userRepository';
import firebaseIdTokenUtil from './utils/firebaseIdTokenUtil';
import UserRepositoryInMemory from './infrastructures/repositories/userRepository/userRepositoryInMemory';
import UserRepositoryAppServer from './infrastructures/repositories/userRepository/userRepositoryAppServer';
import SignInWithEmailAndPasswordViaFirebaseService from './app/services/signInWithEmailAndPasswordViaFirebaseService';

const diConfig = (): void => {
  /** contexts */
  container.registerInstance(userContextToken, userContext);

  /** repositories */

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

  container.register<UserRepository>(userRepositoryToken, {
    useToken: isBrowser() ? appServerUserRepository : inMemoryUserRepository,
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
    inMemoryDailyMealRepository,
    new DailyMealRepositoryInMemory()
  );

  container.registerInstance(
    inMemoryFoodAllergyHistoryRepository,
    new FoodAllergyHistoryRepositoryInMemory()
  );

  container.registerInstance(
    inMemoryUserRepository,
    new UserRepositoryInMemory()
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
      new RestClient(
        container.resolve(restmRestClient),
        '/api/foodstuffs',
        userContext
      )
    )
  );

  container.registerInstance(
    appServerRecipeRepository,
    new RecipeRepositoryAppServer(
      new RestClient(
        container.resolve(restmRestClient),
        '/api/recipes',
        userContext
      )
    )
  );

  container.registerInstance(
    appServerFamilyMemberRepository,
    new FamilyMemberRepositoryAppServer(
      new RestClient(
        container.resolve(restmRestClient),
        '/api/family_members',
        userContext
      )
    )
  );

  container.registerInstance(
    appServerFoodAllergyHistoryRepository,
    new FoodAllergyHistoryRepositoryAppServer(
      new RestClient(
        container.resolve(restmRestClient),
        '/food_allergy_histories',
        userContext
      )
    )
  );

  container.registerInstance(
    appServerDailyMealRepository,
    new DailyMealRepositoryAppServer(
      new RestClient(
        container.resolve(restmRestClient),
        '/api/daily_meals',
        userContext
      )
    )
  );

  container.registerInstance(
    appServerUserRepository,
    new UserRepositoryAppServer(
      new RestClient(
        container.resolve(restmRestClient),
        '/api/users',
        userContext
      )
    )
  );

  /** use cases */

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

  container.register<GetAllRecipesUseCase>(GetAllRecipesUseCase, {
    useFactory: (
      dependencyContainer: DependencyContainer
    ): GetAllRecipesUseCase => {
      const repos = dependencyContainer.resolve<RecipeRepository>(
        recipeRepository
      );
      return new GetAllRecipesUseCase(repos);
    },
  });

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

  /** services */

  container.register<SignedInService>(SignedInService, {
    useFactory: (dependencyContainer: DependencyContainer): SignedInService => {
      const repos = dependencyContainer.resolve<UserRepository>(
        userRepositoryToken
      );
      return new SignedInService(firebaseIdTokenUtil, repos);
    },
  });

  container.registerInstance<SignInWithEmailAndPasswordViaFirebaseService>(
    SignInWithEmailAndPasswordViaFirebaseService,
    new SignInWithEmailAndPasswordViaFirebaseService(
      firebase.auth(),
      new RestClient(
        container.resolve(restmRestClient),
        '/api/signed_in',
        userContext
      ),
      userContext
    )
  );
};

export default diConfig;
