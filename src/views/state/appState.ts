import { Reducer } from 'react';
import Calendar, { makeCalendar } from '../../domain/models/calendar';
import {
  CalendarAction,
  isCalendarAction,
  calendarReducer,
} from './appState/calendar';
import DailyMenu from '../../domain/models/dailyMenu';
import Recipe from '../../domain/models/recipe';
import { Action } from '../../types/action';
import { ActionHandler } from '../../types/actionHandler';
import {
  AllFoodStuffs,
  isAllFoodstuffsAction,
  allFoodstuffsReducer,
  AllFoodstuffsAction,
} from './appState/allFoodstuffs';
import {
  AllRecipesAction,
  isAllRecipesAction,
  allRecipesReducer,
} from './appState/allRecipes';

export type AppState = {
  /* ドメインモデル */

  /**
   * カレンダー
   */
  calendar: Calendar;

  /**
   * 全ての献立
   */
  allDailyMenus: { [key: string]: DailyMenu };

  /**
   * 全てのレシピ
   */
  allRecipes: { [key: string]: Recipe };

  /**
   * 全ての食材
   */
  allFoodstuffs: AllFoodStuffs;

  /* UIのステート */
  bottomNaviIndex: number;
};

/* action messages */
const selectBottomNaviMsg = 'selectBottomNavi';

/* actions */

type SelectBottomNaviAction = Action<
  typeof selectBottomNaviMsg,
  { index: number }
>;

export type AppStateAction =
  | CalendarAction
  | SelectBottomNaviAction
  | AllRecipesAction
  | AllFoodstuffsAction;

/* action handlers */

const selectBottomNaviHandler: ActionHandler<
  AppState,
  SelectBottomNaviAction
> = (appState, { index }) => {
  return { ...appState, bottomNaviIndex: index };
};

/* reducer */

export const appStateReducer: Reducer<AppState, AppStateAction> = (
  state,
  action
) => {
  const newState = {
    ...state,
    calendar: isCalendarAction(action)
      ? calendarReducer(state.calendar, action)
      : state.calendar,
    allFoodstuffs: isAllFoodstuffsAction(action)
      ? allFoodstuffsReducer(state.allFoodstuffs, action)
      : state.allFoodstuffs,
    allRecipes: isAllRecipesAction(action)
      ? allRecipesReducer(state.allRecipes, action)
      : state.allRecipes,
  };
  switch (action.type) {
    case selectBottomNaviMsg:
      return selectBottomNaviHandler(newState, action);
    default:
      return newState;
  }
};

/* initial state */

export const initAppState: AppState = {
  calendar: makeCalendar(),
  allDailyMenus: {},
  allRecipes: {},
  allFoodstuffs: {},
  bottomNaviIndex: 0,
};

/* action creator */

export const selectBottomNavi = async (
  dispatch: React.Dispatch<AppStateAction>,
  index: number
): Promise<void> => {
  dispatch({ type: selectBottomNaviMsg, index });
  return Promise.resolve();
};
