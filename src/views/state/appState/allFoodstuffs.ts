import { Reducer } from 'react';
import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import { map, TaskEither } from 'fp-ts/lib/TaskEither';
import { Action } from '../../../types/action';
import { ActionHandler } from '../../../types/actionHandler';
import createActionDistinguishFunction from '../../../utils/createActionDistinguishFunction';
import { AddFoodstuffForm } from '../../forms/addFoodstuffFormSchema';
import { Foodstuff, makeFoodstuff } from '../../../domain/models/foodstuff';
import SaveFoodstuffUseCase from '../../../domain/useCases/saveFoodstuffUseCase';
import Nutrient from '../../../domain/models/nutrient';
import FoodstuffCategory from '../../../domain/models/foodstuffCategory';
import AppError from '../../../errors/AppError';

export type AllFoodStuffs = { [key: string]: Foodstuff };

/** action messages */

const addFoodstuffMsg = 'addFoodstuff';

const allFoodstuffsMsgs = [addFoodstuffMsg];

/* actions */

export type AddFoodstuffAction = Action<
  typeof addFoodstuffMsg,
  { newFoodstuff: Foodstuff }
>;

export type AllFoodstuffsAction = AddFoodstuffAction;

export const isAllFoodstuffsAction = createActionDistinguishFunction<
  AllFoodstuffsAction
>(allFoodstuffsMsgs);

/* action handler */

const addFoodstuffHandler: ActionHandler<AllFoodStuffs, AddFoodstuffAction> = (
  allFoodstuffs,
  { newFoodstuff }
) => {
  return { ...allFoodstuffs, [newFoodstuff.id]: newFoodstuff };
};

/* reducer */

export const allFoodstuffsReducer: Reducer<
  AllFoodStuffs,
  AllFoodstuffsAction
> = (allFoodstuffs, action) => {
  switch (action.type) {
    case addFoodstuffMsg:
      return addFoodstuffHandler(allFoodstuffs, action);
    default:
      return allFoodstuffs;
  }
};

/* action creator */

export const addFoodstuff = (
  form: AddFoodstuffForm
): TaskEither<AppError, AddFoodstuffAction> => {
  const useCase = container.resolve(SaveFoodstuffUseCase);
  const foodstuff = makeFoodstuff({
    name: form.name,
    nutrients: form.nutrients as Nutrient[],
    category: form.category as FoodstuffCategory,
  });
  return pipe(
    useCase.execute({ foodstuff }),
    map((persistedFoodstuff: Foodstuff) => ({
      type: addFoodstuffMsg,
      newFoodstuff: persistedFoodstuff,
    }))
  );
};
