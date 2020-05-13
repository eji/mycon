import { Reducer } from 'react';
import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { Action } from '../../../types/action';
import { ActionHandler } from '../../../types/actionHandler';
import createActionDistinguishFunction from '../../../utils/createActionDistinguishFunction';
import RepositoryError from '../../../errors/repositoryError';
import DailyMeal, { MealType } from '../../../domain/models/dailyMeal';
import SaveDailyMealUseCase from '../../../domain/useCases/saveDailyMealUseCase';
import Recipe from '../../../domain/models/recipe';

export type AllDailyMeals = { [key: string]: DailyMeal };

/** action messages */

const saveDailyMealMsg = 'saveDailyMeal';

const allDailyMealsMsgs = [saveDailyMealMsg];

/* actions */

export type SaveDailyMealAction = Action<
  typeof saveDailyMealMsg,
  { dailyMeal: DailyMeal }
>;

export type AllDailyMealsAction = SaveDailyMealAction;

export const isAllDailyMealsAction = createActionDistinguishFunction<
  AllDailyMealsAction
>(allDailyMealsMsgs);

/* action handler */

const saveDailyMealHandler: ActionHandler<
  AllDailyMeals,
  SaveDailyMealAction
> = (allDailyMeals, { dailyMeal }) => ({
  ...allDailyMeals,
  [dailyMeal.id]: dailyMeal,
});

/* reducer */

export const allDailyMealsReducer: Reducer<
  AllDailyMeals,
  AllDailyMealsAction
> = (allDailyMeals, action) => {
  switch (action.type) {
    case saveDailyMealMsg:
      return saveDailyMealHandler(allDailyMeals, action);
    default:
      return allDailyMeals;
  }
};

/* action creator */

export const saveDailyMeal = (params: {
  dailyMeal: DailyMeal;
  mealType: MealType;
  recipes: Recipe[];
}): TE.TaskEither<RepositoryError, SaveDailyMealAction> => {
  const { dailyMeal, mealType, recipes } = params;
  const meal = dailyMeal[mealType];
  const newMeal = recipes.reduce((m, r) => m.addRecipe(r), meal);
  const newDailyMeal = dailyMeal.set(mealType, newMeal);
  const useCase = container.resolve(SaveDailyMealUseCase);
  return pipe(
    useCase.execute({ dailyMeal: newDailyMeal }),
    TE.map(() => ({ type: saveDailyMealMsg, dailyMeal: newDailyMeal }))
  );
};
