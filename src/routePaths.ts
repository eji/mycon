import { flow } from 'fp-ts/lib/function';
import CalendarDate from './domain/models/calender/calendarDate';
import { dailyMenuIDFromCalendarDate } from './domain/models/dailyMenu';
import { MealID } from './domain/models/meal';

type PathCreator<T = unknown> = (props?: T) => string;

const makeAddPathCreator = <T = unknown>(
  basePathCreator: PathCreator
): PathCreator<T> => flow(basePathCreator, (basePath) => `${basePath}/add`);

const makeShowPathCreator = (
  basePathCreator: PathCreator
): PathCreator<{ id: string }> => (props?): string => {
  const id = props?.id || ':id';
  return `${basePathCreator()}/${id}`;
};

const makeEditPathCreator = (
  basePathCreator: PathCreator<{ id: string }>
): PathCreator<{ id: string }> => (props): string => {
  return `${basePathCreator(props)}/edit`;
};

export const scheduleScreenPath: PathCreator = () => '/';

/* 一日のメニュー */

export const dailyMenusScreenPath: PathCreator = () => '/daily-menus';
export const showDailyMenuScreenPath: PathCreator<{
  calendarDate: CalendarDate;
}> = (props?: { calendarDate: CalendarDate }) => {
  const id =
    props == null ? ':id' : dailyMenuIDFromCalendarDate(props.calendarDate);
  return `${dailyMenusScreenPath()}/${id}`;
};

export const editDailyMenuScreenPath: PathCreator<{
  calendarDate: CalendarDate;
}> = (props?: { calendarDate: CalendarDate }) =>
  `${showDailyMenuScreenPath(props)}/edit`;

/* 1回の食事 */

export const mealsScreenPath: PathCreator<{
  calendarDate: CalendarDate;
}> = (props?: { calendarDate: CalendarDate }) =>
  `${showDailyMenuScreenPath(props)}/meals`;

export const addMealScreenPath: PathCreator<{
  calendarDate: CalendarDate;
}> = (props?: { calendarDate: CalendarDate }) =>
  `${mealsScreenPath(props)}/add`;

export const showMealScreenPath: PathCreator<{
  calendarDate: CalendarDate;
  mealID: MealID;
}> = (props?: { calendarDate: CalendarDate; mealID: MealID }) => {
  const mealID = props?.mealID || ':mealID';
  return `${mealsScreenPath(props)}/${mealID}`;
};

export const editMealScreenPath: PathCreator<{
  calendarDate: CalendarDate;
  mealID: MealID;
}> = (props?: { calendarDate: CalendarDate; mealID: MealID }) =>
  `${showMealScreenPath(props)}/edit`;

/* レシピ */

export const recipesScreenPath: PathCreator = () => '/recipes';
export const addRecipeScreenPath = makeAddPathCreator(recipesScreenPath);
export const showRecipeScreenPath = makeShowPathCreator(recipesScreenPath);
export const editRecipeScreenPath = makeEditPathCreator(showRecipeScreenPath);

/* 食材 */

export const foodstuffsScreenPath: PathCreator = () => '/foodstuffs';
export const addFoodstuffScreenPath = makeAddPathCreator(foodstuffsScreenPath);
export const showFoodstuffScreenPath = makeShowPathCreator(
  foodstuffsScreenPath
);
export const editFoodstuffScreenPath = makeEditPathCreator(
  showFoodstuffScreenPath
);

/* 家族メンバー */

export const familyMembersScreenPath: PathCreator = () => '/family-members';
export const addFamilyMemberScreenPath = makeAddPathCreator(
  familyMembersScreenPath
);
export const showFamilyMemberScreenPath = makeShowPathCreator(
  familyMembersScreenPath
);
export const editFamilyMemberScreenPath = makeEditPathCreator(
  showFamilyMemberScreenPath
);
