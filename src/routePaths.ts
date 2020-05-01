import { flow } from 'fp-ts/lib/function';
import CalendarDate from './domain/models/calender/calenderDate';
import { dailyMenuIDFromCalendarDate } from './domain/models/dailyMenu';

type PathCreator<T = unknown> = (props?: T) => string;

export const scheduleScreenPath = '/';

export const dailyMenuScreenPath = '/daily-menus/:id';
export const editDailyMenuScreenPath = '/daily-menus/:id/edit';

export const recipesScreenPath: PathCreator = () => '/recipes';
export const addRecipeScreenPath = flow(
  recipesScreenPath,
  (basePath) => `${basePath}/add`
);
export const showRecipeScreenPath: PathCreator<{ id: string }> = (props) => {
  const id = props?.id || ':id';
  return `${recipesScreenPath}/${id}`;
};
export const editRecipeScreenPath = flow(
  showRecipeScreenPath,
  (basePath) => `${basePath}/edit`
);

export const foodstuffsScreenPath: PathCreator = () => '/foodstuffs';
export const addFoodstuffScreenPath = flow(
  foodstuffsScreenPath,
  (basePath: string): string => `${basePath}/add`
);
export const showFoodstuffScreenPath: PathCreator<{ id: string }> = (props) => {
  const id = props?.id || ':id';
  return `${foodstuffsScreenPath()}/${id}`;
};
export const editFoodstuffScreenPath = flow(
  showFoodstuffScreenPath,
  (path) => `${path}/edit`
);

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
