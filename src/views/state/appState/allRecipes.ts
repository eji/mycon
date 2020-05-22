import { Reducer } from 'react';
import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { Action } from '../../../types/action';
import { ActionHandler } from '../../../types/actionHandler';
import createActionDistinguishFunction from '../../../utils/createActionDistinguishFunction';
import { Foodstuff } from '../../../domain/models/foodstuff';
import RepositoryError from '../../../errors/repositoryError';
import Recipe, { makeRecipe } from '../../../domain/models/recipe';
import { InputRecipeForm } from '../../forms/inputRecipeFormSchema';
import SaveRecipeUseCase from '../../../domain/useCases/saveRecipeUseCase';
import { makeRecipeIngredient } from '../../../domain/models/recipeIngredient';

export type AllRecipes = { [key: string]: Recipe };

/** action messages */

const addRecipeMsg = 'addRecipe';

const allRecipesMsgs = [addRecipeMsg];

/* actions */

export type AddRecipeAction = Action<
  typeof addRecipeMsg,
  { newRecipe: Recipe }
>;

export type AllRecipesAction = AddRecipeAction;

export const isAllRecipesAction = createActionDistinguishFunction<
  AllRecipesAction
>(allRecipesMsgs);

/* action handler */

const addRecipeHandler: ActionHandler<AllRecipes, AddRecipeAction> = (
  allRecipes,
  { newRecipe }
) => {
  return { ...allRecipes, [newRecipe.id]: newRecipe };
};

/* reducer */

export const allRecipesReducer: Reducer<AllRecipes, AllRecipesAction> = (
  allRecipes,
  action
) => {
  switch (action.type) {
    case addRecipeMsg:
      return addRecipeHandler(allRecipes, action);
    default:
      return allRecipes;
  }
};

/* action creator */

export const addRecipe = (params: {
  form: InputRecipeForm;
  allFoodstuffs: { [key: string]: Foodstuff };
}): TE.TaskEither<RepositoryError, AddRecipeAction> => {
  const { form, allFoodstuffs } = params;
  const useCase = container.resolve(SaveRecipeUseCase);
  const ingredients = form.ingredients.map((ingredient) =>
    makeRecipeIngredient({
      ...ingredient,
      foodstuff: allFoodstuffs[ingredient.foodstuffID],
    })
  );
  const recipe = makeRecipe({ ...form, ingredients });
  return pipe(
    useCase.execute({ recipe }),
    TE.map((savedRecipe) => ({ type: addRecipeMsg, newRecipe: savedRecipe }))
  );
};
