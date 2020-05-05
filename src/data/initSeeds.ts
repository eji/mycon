import { container } from 'tsyringe';
import * as TE from 'fp-ts/lib/TaskEither';
import FoodstuffRepository from '../domain/repositories/foodstuffRepository';
import { foodstuffRepository } from '../types/diTypes';
import foodstuffSeeds from './seeds/foodstuffs';
import CommandError from '../errors/repositoryErrors/commandError';

export default function initSeeds(): TE.TaskEither<CommandError, unknown> {
  const foodstuffRepo = container.resolve<FoodstuffRepository>(
    foodstuffRepository
  );

  return foodstuffRepo.saveValues(foodstuffSeeds);
}
