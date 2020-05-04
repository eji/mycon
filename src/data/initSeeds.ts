import { container } from 'tsyringe';
import FoodstuffRepository from '../domain/repositories/foodstuffRepository';
import { foodstuffRepository } from '../types/diTypes';
import foodstuffSeeds from './seeds/foodstuffs';

export default function initSeeds(): void {
  const foodstuffRepo = container.resolve<FoodstuffRepository>(
    foodstuffRepository
  );

  foodstuffRepo.saveValues(foodstuffSeeds);
}
