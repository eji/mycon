import { flow } from 'fp-ts/lib/function';
import CalendarDate from './domain/models/calender/calendarDate';
import {
  dailyMealIDFromCalendarDate,
  MealType,
} from './domain/models/dailyMeal';
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

/* サインイン画面 */
export const signInScreenPath: PathCreator = () => '/sign-in';

export const scheduleScreenPath: PathCreator = () => '/';

/* 一日のメニュー */

export const dailyMealsScreenPath: PathCreator = () => '/daily-meals';
export const showDailyMealScreenPath: PathCreator<{
  calendarDate: CalendarDate;
}> = (props?: { calendarDate: CalendarDate }) => {
  const id =
    props == null ? ':id' : dailyMealIDFromCalendarDate(props.calendarDate);
  return `${dailyMealsScreenPath()}/${id}`;
};

export const editDailyMealScreenPath: PathCreator<{
  calendarDate: CalendarDate;
}> = (props?: { calendarDate: CalendarDate }) =>
  `${showDailyMealScreenPath(props)}/edit`;

/* 食事 */
export const addRecipeToDailyMenuDialogPath: PathCreator<{
  calendarDate: CalendarDate;
  mealType: MealType;
}> = (props?: { calendarDate: CalendarDate; mealType: MealType }) => {
  const mealType = props?.mealType || ':mealType';
  return `${showDailyMealScreenPath(props)}/${mealType}/recipes/add`;
};

/* 1回の食事 */

export const mealsScreenPath: PathCreator<{
  calendarDate: CalendarDate;
}> = (props?: { calendarDate: CalendarDate }) =>
  `${showDailyMealScreenPath(props)}/meals`;

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

/* アレルギー情報の追加 */

export const addFoodAllergyHistoryScreenPath: PathCreator<{
  id: string;
}> = (props) => `${showFoodstuffScreenPath(props)}/add-allergy-history`;

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
