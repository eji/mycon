import { GraphQLList } from 'graphql';
import { container } from 'tsyringe';
import { isLeft } from 'fp-ts/lib/Either';
import foodstuffType from '../types/foodstuffType';
import { Foodstuff } from '../../../domain/models/foodstuff';
import GetAllFoodstuffsUseCase from '../../../domain/useCases/getAllFoodstuffsUseCase';

const resolve = async (): Promise<Foodstuff[]> => {
  const useCase = container.resolve<GetAllFoodstuffsUseCase>(
    GetAllFoodstuffsUseCase
  );
  const foodstuffs = await useCase.execute()();

  if (isLeft(foodstuffs)) {
    return [];
  }

  return foodstuffs.right;
};

const foodstuffsField = {
  foodstuffs: {
    type: GraphQLList(foodstuffType),
    resolve,
  },
};

export default foodstuffsField;
