import CalendarDate from './domain/models/calender/calenderDate';
import { dailyMenuIDFromCalendarDate } from './domain/models/dailyMenu';

export const scheduleScreenPath = '/';

export const dailyMenuScreenPath = '/daily-menus/:id';
export const editDailyMenuScreenPath = '/daily-menus/:id/edit';

export const recipesScreenPath = '/recipes';
export const addRecipeScreenPath = '/recipes/add';

export const foodstuffsScreenPath = '/foodstuffs';
export const addFoodstuffScreenPath = '/foodstuffs/add';

export const makeDailyMenuScreenPath = (props: {
  calendarDate: CalendarDate;
}): string => {
  const dailyMenuID = dailyMenuIDFromCalendarDate(props.calendarDate);
  return `/daily-menus/${dailyMenuID}`;
};

export const makeEditDailyMenuScreenPath = (props: {
  calendarDate: CalendarDate;
}): string => {
  const dailyMenuID = dailyMenuIDFromCalendarDate(props.calendarDate);
  return `/daily-menus/${dailyMenuID}/edit`;
};
