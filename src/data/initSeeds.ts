import { container } from 'tsyringe';
import * as TE from 'fp-ts/lib/TaskEither';
import FoodstuffRepository from '../domain/repositories/foodstuffRepository';
import { foodstuffRepository } from '../types/diTypes';
import foodstuffSeeds from './seeds/foodstuffs';
import AppError from '../errors/AppError';

export default function initSeeds(): TE.TaskEither<AppError, unknown> {
  const foodstuffRepo = container.resolve<FoodstuffRepository>(
    foodstuffRepository
  );

  return foodstuffRepo.saveValues(foodstuffSeeds);
}
