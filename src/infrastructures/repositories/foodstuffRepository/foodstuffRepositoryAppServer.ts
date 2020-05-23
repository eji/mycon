import * as TE from 'fp-ts/lib/TaskEither';
import * as A from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/pipeable';
import CommandError from '../../../errors/repositoryErrors/commandError';
import FoodstuffRepository from '../../../domain/repositories/foodstuffRepository';
import {
  Foodstuff,
  UnpersistedFoodstuff,
} from '../../../domain/models/foodstuff';
import RestClient from '../../../drivers/restClient';
import BaseError from '../../../errors/baseError';
import FoodstuffsResponse, {
  foodstuffsFromResponse,
} from '../../../api/handlers/foodstuffs/responses/foodstuffsResponse';
import * as createReq from '../../../api/handlers/foodstuffs/requests/createFoodstuffRequest';
import * as replaceReq from '../../../api/handlers/foodstuffs/requests/replaceFoodstuffRequest';
import { isPersisted } from '../../../types/unpersisted';
import FoodstuffResponse, {
  foodstuffFromResponse,
} from '../../../api/handlers/foodstuffs/responses/foodstuffResponse';

export default class FoodstuffRepositoryAppServer
  implements FoodstuffRepository {
  constructor(readonly restClient: RestClient) {}

  all = (): TE.TaskEither<BaseError, Foodstuff[]> =>
    pipe(
      this.restClient.all<FoodstuffsResponse>(),
      TE.map(foodstuffsFromResponse)
    );

  saveValue = (
    foodstuff: Foodstuff | UnpersistedFoodstuff
  ): TE.TaskEither<CommandError, Foodstuff> => {
    if (isPersisted<Foodstuff>(foodstuff)) {
      return this.replaceValue(foodstuff);
    }
    return this.createValue(foodstuff);
  };

  saveValues = (
    foodstuffs: (Foodstuff | UnpersistedFoodstuff)[]
  ): TE.TaskEither<BaseError, Foodstuff[]> =>
    A.array.sequence(TE.taskEither)(foodstuffs.map(this.saveValue));

  private createValue = (
    foodstuff: UnpersistedFoodstuff
  ): TE.TaskEither<BaseError, Foodstuff> =>
    pipe(
      createReq.requestFromFoodstuff(foodstuff),
      (request) =>
        this.restClient.create<
          createReq.CreatFoodstuffRequest,
          FoodstuffResponse
        >(request),
      TE.map(foodstuffFromResponse)
    );

  private replaceValue = (
    foodstuff: Foodstuff
  ): TE.TaskEither<CommandError, Foodstuff> =>
    pipe(
      replaceReq.requestFromFoodstuff(foodstuff),
      (request) =>
        this.restClient.replace<
          replaceReq.ReplaceFoodstuffRequest,
          FoodstuffResponse
        >(request),
      TE.map(foodstuffFromResponse)
    );
}
