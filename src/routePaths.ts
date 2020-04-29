import CalendarDate from "./domain/models/calender/calenderDate";
import { dailyMenuIDFromCalendarDate } from "./domain/models/dailyMenu";

export const scheduleScreenPath = "/";
export const dailyMenuScreenPath = "/daily-menus/:id";

export const makeDailyMenuScreenPath = (props: {
  calendarDate: CalendarDate;
}): string => {
  const dailyMenuID = dailyMenuIDFromCalendarDate(props.calendarDate);
  return `/daily-menus/${dailyMenuID}`;
};
