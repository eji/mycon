import { Record } from 'immutable';
import CalendarDate, { makeDate } from './calender/calendarDate';
import Meal from './meal';

export type DailyMealID = string;

const dailyMealIDRegexp = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;

export const dailyMealIDFromCalendarDate = (
  calendarDate: CalendarDate
): DailyMealID =>
  `${calendarDate.year}-${calendarDate.month}-${calendarDate.day}`;

export const calendarDateFromDailyMealID = (
  dailyMealID: DailyMealID
): CalendarDate | null => {
  const match = dailyMealID.match(dailyMealIDRegexp);
  if (match == null) {
    return null;
  }
  const year = Number.parseInt(match[1], 10);
  const month = Number.parseInt(match[2], 10);
  const day = Number.parseInt(match[3], 10);
  return makeDate({ year, month, day });
};

interface Props {
  id: DailyMealID;

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
export default interface DailyMeal extends Props {
  set<K extends keyof Props>(key: K, value: Props[K]): this;

  /**
   * 食事を追加する
   */
  addMeal(meal: Meal): this;

  /**
   * 食事を削除する
   */
  removeMeal(meal: Meal): this;
}

class DailyMealClass
  extends Record<Readonly<Props>>({
    id: '',
    calendarDate: makeDate(),
    meals: [],
  })
  implements DailyMeal {
  static create(props: Omit<Props, 'id'>): DailyMeal {
    const id = dailyMealIDFromCalendarDate(props.calendarDate);
    return new DailyMealClass({ ...props, id });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private constructor(...args: any[]) {
    super(...args);
  }

  addMeal = (meal: Meal): this => this.set('meals', [...this.meals, meal]);

  removeMeal = (meal: Meal): this =>
    this.set('meals', this.meals.filter(meal.notEquals));
}

export const makeDailyMeal = (props: Omit<Props, 'id'>): DailyMeal =>
  DailyMealClass.create(props);
