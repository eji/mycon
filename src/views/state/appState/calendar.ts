import { Reducer } from "react";
import { Action } from "../../../types/action";
import { ActionHandler } from "../../../types/actionHandler";
import Calendar from "../../../domain/models/calendar";
import createActionDistinguishFunction from "../../../utils/createActionDistinguishFunction";

/** action messages */

const selectMonth = "selectMonth";

const calendarMessages = [selectMonth];

/* actions */

type SelectMonthAction = Action<
  typeof selectMonth,
  { direction: "prev" | "next" }
>;

export type CalendarAction = SelectMonthAction;

export const isCalendarAction = createActionDistinguishFunction<CalendarAction>(
  calendarMessages
);

/* action handler */

const selectMonthHandler: ActionHandler<Calendar, SelectMonthAction> = (
  calendar,
  { direction }
) => {
  switch (direction) {
    case "prev":
      return calendar.prevMonth();
    case "next":
      return calendar.nextMonth();
    default:
      return calendar;
  }
};

/* reducer */

export const calendarReducer: Reducer<Calendar, CalendarAction> = (
  calendar,
  action
) => {
  switch (action.type) {
    case selectMonth:
      return selectMonthHandler(calendar, action);
    default:
      return calendar;
  }
};

/* action creator */

export const selectPrevMonth = async (
  dispatch: React.Dispatch<CalendarAction>
): Promise<void> => {
  dispatch({ type: selectMonth, direction: "prev" });
};

export const selectNextMonth = async (
  dispatch: React.Dispatch<CalendarAction>
): Promise<void> => {
  dispatch({ type: selectMonth, direction: "next" });
};
