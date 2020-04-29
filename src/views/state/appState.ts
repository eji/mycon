import { Reducer } from 'react';
import Calendar, { makeCalendar } from '../../domain/models/calendar';
import {
  CalendarAction,
  isCalendarAction,
  calendarReducer,
} from './appState/calendar';
import DailyMenu from '../../domain/models/dailyMenu';
import Recipe from '../../domain/models/recipe';
import Foodstuff from '../../domain/models/foodstuff';
import { Action } from '../../types/action';
import { ActionHandler } from '../../types/actionHandler';

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
  allFoodstuffs: { [key: string]: Foodstuff };

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

export type AppStateAction = CalendarAction | SelectBottomNaviAction;

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
  if (isCalendarAction(action)) {
    return { ...state, calendar: calendarReducer(state.calendar, action) };
  }
  switch (action.type) {
    case selectBottomNaviMsg:
      return selectBottomNaviHandler(state, action);
    default:
      return state;
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
