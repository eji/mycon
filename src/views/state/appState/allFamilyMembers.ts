import { Reducer } from 'react';
import { Action } from '../../../types/action';
import { ActionHandler } from '../../../types/actionHandler';
import createActionDistinguishFunction from '../../../utils/createActionDistinguishFunction';
import FamilyMember from '../../../domain/models/familyMember';

export type AllFamilyMembers = { [key: string]: FamilyMember };

/** action messages */

const addFamilyMembersMsg = 'addFamilyMembers';

const allFamilyMembersMsgs = [addFamilyMembersMsg];

/* actions */

export type AddFamilyMembersAction = Action<
  typeof addFamilyMembersMsg,
  { familyMembers: FamilyMember[] }
>;

export type AllFamilyMembersAction = AddFamilyMembersAction;

export const isAllFamilyMembersAction = createActionDistinguishFunction<
  AllFamilyMembersAction
>(allFamilyMembersMsgs);

/* action handler */

const addFamiyMembersHandler: ActionHandler<
  AllFamilyMembers,
  AddFamilyMembersAction
> = (allFamilyMembers, { familyMembers }) => {
  return familyMembers.reduce(
    (allMembers, familyMember) => ({
      ...allMembers,
      [familyMember.id]: familyMember,
    }),
    allFamilyMembers
  );
};

/* reducer */

export const allFamilyMembersReducer: Reducer<
  AllFamilyMembers,
  AllFamilyMembersAction
> = (allFamilyMembers, action) => {
  switch (action.type) {
    case addFamilyMembersMsg:
      return addFamiyMembersHandler(allFamilyMembers, action);
    default:
      return allFamilyMembers;
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
