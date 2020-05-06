import { Record } from 'immutable';
import CalendarDate, { makeDate } from './calender/calendarDate';
import Meal from './meal';

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
   * 食事一覧
   */
  meals: Meal[];
}

/**
 * 一日のメニュー
 */
export default interface DailyMenu extends DailyMenuProps {
  set<K extends keyof DailyMenuProps>(key: K, value: DailyMenuProps[K]): this;

  /**
   * 食事を追加する
   */
  addMeal(meal: Meal): this;

  /**
   * 食事を削除する
   */
  removeMeal(meal: Meal): this;
}

class DailyMenuClass
  extends Record<Readonly<DailyMenuProps>>({
    id: '',
    calendarDate: makeDate(),
    meals: [],
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

  addMeal = (meal: Meal): this => this.set('meals', [...this.meals, meal]);

  removeMeal = (meal: Meal): this =>
    this.set('meals', this.meals.filter(meal.notEquals));
}

export const makeDailyMenu = (props: Omit<DailyMenuProps, 'id'>): DailyMenu =>
  DailyMenuClass.create(props);
