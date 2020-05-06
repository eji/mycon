import { Reducer } from 'react';
import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { Action } from '../../../types/action';
import { ActionHandler } from '../../../types/actionHandler';
import createActionDistinguishFunction from '../../../utils/createActionDistinguishFunction';
import RepositoryError from '../../../errors/repositoryError';
import DailyMenu, {
  makeDailyMenu,
  dailyMenuIDFromCalendarDate,
} from '../../../domain/models/dailyMenu';
import CalendarDate from '../../../domain/models/calender/calendarDate';
import { InputMealForm } from '../../forms/inputMealFormSchema';
import SaveDailyMenuUseCase from '../../../domain/useCases/saveDailyMenuUseCase';
import Recipe from '../../../domain/models/recipe';
import { makeMeal } from '../../../domain/models/meal';

export type AllDailyMenus = { [key: string]: DailyMenu };

/** action messages */

const saveDailyMenuMsg = 'saveDailyMenu';

const allDailyMenusMsgs = [saveDailyMenuMsg];

/* actions */

export type SaveDailyMenuAction = Action<
  typeof saveDailyMenuMsg,
  { dailyMenu: DailyMenu }
>;

export type AllDailyMenusAction = SaveDailyMenuAction;

export const isAllDailyMenusAction = createActionDistinguishFunction<
  AllDailyMenusAction
>(allDailyMenusMsgs);

/* action handler */

const saveDailyMenuHandler: ActionHandler<
  AllDailyMenus,
  SaveDailyMenuAction
> = (allDailyMenus, { dailyMenu }) => ({
  ...allDailyMenus,
  [dailyMenu.id]: dailyMenu,
});

/* reducer */

export const allDailyMenusReducer: Reducer<
  AllDailyMenus,
  AllDailyMenusAction
> = (allDailyMenus, action) => {
  switch (action.type) {
    case saveDailyMenuMsg:
      return saveDailyMenuHandler(allDailyMenus, action);
    default:
      return allDailyMenus;
  }
};

/* action creator */

export const addMeal = (params: {
  form: InputMealForm;
  calendarDate: CalendarDate;
  allDailyMenus: { [key: string]: DailyMenu };
  allRecipes: { [key: string]: Recipe };
}): TE.TaskEither<RepositoryError, SaveDailyMenuAction> => {
  const { form, calendarDate, allDailyMenus, allRecipes } = params;
  const meal = makeMeal({
    recipes: form.recipeIDs.map((rid) => allRecipes[rid]),
  });
  const id = dailyMenuIDFromCalendarDate(calendarDate);
  const dailyMenu =
    allDailyMenus[id] || makeDailyMenu({ calendarDate, meals: [] });
  const newDailyMenu = dailyMenu.addMeal(meal);
  const useCase = container.resolve(SaveDailyMenuUseCase);
  return pipe(
    useCase.execute({ dailyMenu: newDailyMenu }),
    TE.map(() => ({ type: saveDailyMenuMsg, dailyMenu: newDailyMenu }))
  );
};
