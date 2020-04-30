import { container, DependencyContainer } from 'tsyringe';
import FoodstuffRepository from './domain/repositories/foodstuffRepository';
import {
  foodstuffRepository,
  inMemoryFoodstuffRepository,
} from './types/diTypes';
import FoodstuffRepositoryInMemory from './infrastructures/repositories/foodstuffRepository/foodstuffRepositoryInMemory';
import AddFoodstuffUseCase from './domain/useCases/addFoodstuffUseCase';

export const initDI = (): void => {
  container.register<FoodstuffRepository>(foodstuffRepository, {
    useToken: inMemoryFoodstuffRepository,
  });

  /* in-memory repository */

  container.registerInstance(
    inMemoryFoodstuffRepository,
    new FoodstuffRepositoryInMemory()
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
};

export default initDI;
