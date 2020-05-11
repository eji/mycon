import { Reducer } from 'react';
import * as TE from 'fp-ts/lib/TaskEither';
import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import { Action } from '../../../types/action';
import { ActionHandler } from '../../../types/actionHandler';
import createActionDistinguishFunction from '../../../utils/createActionDistinguishFunction';
import FoodAllergyHistory, {
  makeFoodAllergyHistory,
} from '../../../domain/models/foodAllergyHistory';
import { AddFoodAllergyHistoryForm } from '../../forms/addFoodAllergyHistoryFormSchema';
import { Foodstuff } from '../../../domain/models/foodstuff';
import FamilyMember from '../../../domain/models/familyMember';
import RepositoryError from '../../../errors/repositoryError';
import SaveFoodAllergyHistoryUseCase from '../../../domain/useCases/saveFoodAllergyHistoryUseCase';

export type AllFoodAllergyHistories = {
  byFamilyMember: { [key: string]: FoodAllergyHistory };
  byFoodstuff: { [key: string]: FoodAllergyHistory };
};

/** action messages */

const addFoodAllergyHistoryMsg = 'addFoodAllergyHistory';

const allFoodAllergyHistoriesMsgs = [addFoodAllergyHistoryMsg];

/* actions */

export type AddFoodAllergyHistoryAction = Action<
  typeof addFoodAllergyHistoryMsg,
  { foodAllergyHistory: FoodAllergyHistory }
>;

export type AllFoodAllergyHistoriesAction = AddFoodAllergyHistoryAction;

export const isAllFoodAllergyHistoriesAction = createActionDistinguishFunction<
  AllFoodAllergyHistoriesAction
>(allFoodAllergyHistoriesMsgs);

/* action handler */

const addFoodAllergyHistoryHandler: ActionHandler<
  AllFoodAllergyHistories,
  AddFoodAllergyHistoryAction
> = (allFoodAllergyHistories, { foodAllergyHistory }) => {
  const { byFamilyMember, byFoodstuff } = allFoodAllergyHistories;
  const { familyMember, foodstuff } = foodAllergyHistory;
  return {
    byFamilyMember: {
      ...byFamilyMember,
      [familyMember.id]: foodAllergyHistory,
    },
    byFoodstuff: {
      ...byFoodstuff,
      [foodstuff.id]: foodAllergyHistory,
    },
  };
};

/* reducer */

export const allFoodAllergyHistoriesReducer: Reducer<
  AllFoodAllergyHistories,
  AllFoodAllergyHistoriesAction
> = (allFoodAllergyHistories, action) => {
  switch (action.type) {
    case addFoodAllergyHistoryMsg:
      return addFoodAllergyHistoryHandler(allFoodAllergyHistories, action);
    default:
      return allFoodAllergyHistories;
  }
};

/* action creator */

export const addFoodAllergyHistory = (params: {
  form: AddFoodAllergyHistoryForm;
  foodstuff: Foodstuff;
  allFamilyMembers: { [key: string]: FamilyMember };
}): TE.TaskEither<RepositoryError, AddFoodAllergyHistoryAction> => {
  const { form, foodstuff, allFamilyMembers } = params;
  const familyMember = allFamilyMembers[form.familyMemberID];
  const foodAllergyHistory = makeFoodAllergyHistory({
    familyMember,
    foodstuff,
  });
  const useCase = container.resolve(SaveFoodAllergyHistoryUseCase);
  return pipe(
    useCase.execute({ foodAllergyHistory }),
    TE.map(() => ({ type: addFoodAllergyHistoryMsg, foodAllergyHistory }))
  );
};
