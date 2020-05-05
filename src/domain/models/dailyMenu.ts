import { Record } from 'immutable';
import Recipe from './recipe';
import CalendarDate, { makeDate } from './calender/calendarDate';

export type DailyMenuID = string;

const dailyMenuIDRegexp = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

export const dailyMenuIDFromCalendarDate = (
  calendarDate: CalendarDate
): DailyMenuID =>
  `${calendarDate.year}-${calendarDate.month}-${calendarDate.day}`;

export const calendarDateFromDailyMenuID = (
  dailyMenuID: DailyMenuID
): CalendarDate | null => {
  const match = dailyMenuID.match(dailyMenuIDRegexp);
  if (match == null) {
    return null;
  }
  const year = Number.parseInt(match[1], 10);
  const month = Number.parseInt(match[2], 10);
  const day = Number.parseInt(match[3], 10);
  return makeDate({ year, month, day });
};

interface DailyMenuProps {
  id: DailyMenuID;

  /**
   * 対象の日
   */
  calendarDate: CalendarDate;

  /**
   * 朝食のレシピ一覧
   */
  breakfastRecipes: Recipe[];

  /**
   * 昼食のレシピ一覧
   */
  lunchRecipes: Recipe[];

  /**
   * 夕食のレシピ一覧
   */
  dinnerRecipes: Recipe[];
}

/**
 * 一日のメニュー
 */
export default interface DailyMenu extends DailyMenuProps {
  set<K extends keyof DailyMenuProps>(key: K, value: DailyMenuProps[K]): this;

  /**
   * 朝食にレシピを追加する
   */
  addRecipeToBreakfast(recipe: Recipe): this;

  /**
   * 昼食にレシピを追加する
   */
  addRecipeToLunch(recipe: Recipe): this;

  /**
   * 夕食にレシピを追加する
   */
  addRecipeToDinner(recipe: Recipe): this;

  /**
   * 夕食からレシピを削除する
   */
  removeRecipeFromBreakfast(recipe: Recipe): this;

  /**
   * 夕食からレシピを削除する
   */
  removeRecipeFromLunch(recipe: Recipe): this;

  /**
   * 夕食からレシピを削除する
   */
  removeRecipeFromDinner(recipe: Recipe): this;

  /**
   * 全てのレシピを取得
   */
  allRecipes(): Recipe[];
}

class DailyMenuClass
  extends Record<Readonly<DailyMenuProps>>({
    id: '',
    calendarDate: makeDate(),
    breakfastRecipes: [],
    lunchRecipes: [],
    dinnerRecipes: [],
  })
  implements DailyMenu {
  static create(props: Omit<DailyMenuProps, 'id'>): DailyMenu {
    const id = dailyMenuIDFromCalendarDate(props.calendarDate);
    return new DailyMenuClass({ ...props, id });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private constructor(...args: any[]) {
    super(...args);
  }

  addRecipeToBreakfast(recipe: Recipe): this {
    return this.set('breakfastRecipes', [...this.breakfastRecipes, recipe]);
  }

  addRecipeToLunch(recipe: Recipe): this {
    return this.set('lunchRecipes', [...this.lunchRecipes, recipe]);
  }

  addRecipeToDinner(recipe: Recipe): this {
    return this.set('dinnerRecipes', [...this.dinnerRecipes, recipe]);
  }

  removeRecipeFromBreakfast(recipe: Recipe): this {
    return this.set(
      'breakfastRecipes',
      this.breakfastRecipes.filter((r) => !r.equals(recipe))
    );
  }

  removeRecipeFromLunch(recipe: Recipe): this {
    return this.set(
      'lunchRecipes',
      this.lunchRecipes.filter((r) => !r.equals(recipe))
    );
  }

  removeRecipeFromDinner(recipe: Recipe): this {
    return this.set(
      'dinnerRecipes',
      this.dinnerRecipes.filter((r) => !r.equals(recipe))
    );
  }

  allRecipes(): Recipe[] {
    return [
      ...this.breakfastRecipes,
      ...this.lunchRecipes,
      ...this.dinnerRecipes,
    ];
  }
}

export const makeDailyMenu = (props: Omit<DailyMenuProps, 'id'>): DailyMenu =>
  DailyMenuClass.create(props);
