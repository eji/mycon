import { Reducer } from 'react';
import { Action } from '../../../types/action';
import { ActionHandler } from '../../../types/actionHandler';
import createActionDistinguishFunction from '../../../utils/createActionDistinguishFunction';
import FoodAllergyHistory from '../../../domain/models/foodAllergyHistory';

export type AllFoodAllergyHistories = {
  byFamilyMember: { [key: string]: FoodAllergyHistory };
  byFoodstuff: { [key: string]: FoodAllergyHistory };
};

/** action messages */

const addFoodAllergyHistory = 'addFoodAllergyHistory';

const allFoodAllergyHistoriesMsgs = [addFoodAllergyHistory];

/* actions */

export type AddFoodAllergyHistoryAction = Action<
  typeof addFoodAllergyHistory,
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
    case addFoodAllergyHistory:
      return addFoodAllergyHistoryHandler(allFoodAllergyHistories, action);
    default:
      return allFoodAllergyHistories;
  }
};

/* action creator */

// export const addRecipe = (params: {
//   form: AddRecipeForm;
//   allFoodstuffs: { [key: string]: Foodstuff };
// }): TE.TaskEither<RepositoryError, AddFamilyMembersAction> => {
//   const { form, allFoodstuffs } = params;
//   const useCase = container.resolve(SaveRecipeUseCase);
//   const ingredients = form.ingredients.map((ingredient) =>
//     makeRecipeIngredient({
//       ...ingredient,
//       foodstuff: allFoodstuffs[ingredient.foodstuffID],
//     })
//   );
//   const recipe = makeRecipe({ ...form, ingredients });
//   return pipe(
//     useCase.execute({ recipe }),
//     TE.map(() => ({ type: addFamilyMembersMsg, newRecipe: recipe }))
//   );
// };
