import { Reducer } from 'react';
import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { Action } from '../../../types/action';
import { ActionHandler } from '../../../types/actionHandler';
import createActionDistinguishFunction from '../../../utils/createActionDistinguishFunction';
import RepositoryError from '../../../errors/repositoryError';
import DailyMeal, {
  makeDailyMeal,
  dailyMealIDFromCalendarDate,
} from '../../../domain/models/dailyMeal';
import CalendarDate from '../../../domain/models/calender/calendarDate';
import { InputMealForm } from '../../forms/inputMealFormSchema';
import SaveDailyMealUseCase from '../../../domain/useCases/saveDailyMealUseCase';
import Recipe from '../../../domain/models/recipe';
import { makeMeal } from '../../../domain/models/meal';

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

export const addMeal = (params: {
  form: InputMealForm;
  calendarDate: CalendarDate;
  allDailyMeals: { [key: string]: DailyMeal };
  allRecipes: { [key: string]: Recipe };
}): TE.TaskEither<RepositoryError, SaveDailyMealAction> => {
  const { form, calendarDate, allDailyMeals, allRecipes } = params;
  const meal = makeMeal({
    ...form,
    recipes: form.recipeIDs.map((rid) => allRecipes[rid]),
  });
  const id = dailyMealIDFromCalendarDate(calendarDate);
  const dailyMeal =
    allDailyMeals[id] || makeDailyMeal({ calendarDate, meals: [] });
  const newDailyMeal = dailyMeal.addMeal(meal);
  const useCase = container.resolve(SaveDailyMealUseCase);
  return pipe(
    useCase.execute({ dailyMeal: newDailyMeal }),
    TE.map(() => ({ type: saveDailyMealMsg, dailyMeal: newDailyMeal }))
  );
};
