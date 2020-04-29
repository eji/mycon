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
};

/* action messages */

/* actions */

export type AppStateAction = CalendarAction;

/* action handlers */

/* reducer */

export const appStateReducer: Reducer<AppState, AppStateAction> = (
  state,
  action
) => {
  if (isCalendarAction(action)) {
    return { ...state, calendar: calendarReducer(state.calendar, action) };
  }
  return state;
};

/* initial state */

export const initAppState: AppState = {
  calendar: makeCalendar(),
  allDailyMenus: {},
  allRecipes: {},
  allFoodstuffs: {},
};
