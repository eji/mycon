import { Reducer } from 'react';
import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import { map, TaskEither } from 'fp-ts/lib/TaskEither';
import { Action } from '../../../types/action';
import { ActionHandler } from '../../../types/actionHandler';
import createActionDistinguishFunction from '../../../utils/createActionDistinguishFunction';
import { AddFoodstuffForm } from '../../forms/addFoodstuffFormSchema';
import Foodstuff from '../../../domain/models/foodstuff';
import AddFoodstuffUseCase from '../../../domain/useCases/addFoodstuffUseCase';
import RepositoryError from '../../../errors/repositoryError';

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
  return { ...allFoodstuffs, [newFoodstuff]: newFoodstuff };
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

// export const addFoodstuff2 = async (
//   dispatch: React.Dispatch<AppStateAction>,
//   form: AddFoodstuffForm
// ): Promise<Option<RepositoryError>> => {
//   const result = await container
//     .resolve(AddFoodstuffUseCase)
//     .execute({ foodstuff: form.name });
//   if (isRight(result)) {
//     dispatch({ type: addFoodstuffMsg, newFoodstuff: result.right });
//   }
//   return getLeft(result);
// };

export const addFoodstuff = (
  form: AddFoodstuffForm
): TaskEither<RepositoryError, AddFoodstuffAction> => {
  const useCase = container.resolve(AddFoodstuffUseCase);
  return pipe(
    useCase.execute({ foodstuff: form.name }),
    map(() => ({ type: addFoodstuffMsg, newFoodstuff: form.name }))
  );
};
