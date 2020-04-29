import { Reducer } from "react";
import Calendar, { makeCalendar } from "../../domain/models/calendar";
import {
  CalendarAction,
  isCalendarAction,
  calendarReducer,
} from "./appState/calendar";
import DailyMenu from "../../domain/models/dailyMenu";
import CalendarDate from "../../domain/models/calender/calenderDate";

export type AppState = {
  /**
   * カレンダー
   */
  calendar: Calendar;

  /**
   * 選択中の一日のメニュー
   */
  selectedDailyMenu?: DailyMenu;

  allDailyMenus: { [key: CalendarDate]: DailyMenu };
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
};
