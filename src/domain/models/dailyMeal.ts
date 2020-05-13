import { Record } from 'immutable';
import CalendarDate, { makeDate } from './calender/calendarDate';
import Meal, { makeMeal } from './meal';

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

interface MealsProps {
  /**
   * 朝食
   */
  breakfast: Meal;

  /**
   * 昼食
   */
  lunch: Meal;

  /**
   * 夕食
   */
  dinner: Meal;

  /**
   * おやつ
   */
  snack: Meal;
}

export type MealType = keyof MealsProps;

interface Props extends MealsProps {
  id: DailyMealID;

  /**
   * 対象の日
   */
  calendarDate: CalendarDate;
}

/**
 * 一日のメニュー
 */
export default interface DailyMeal extends Props {
  set<K extends keyof Props>(key: K, value: Props[K]): this;
}

export const makeDailyMeal = (props: Omit<Props, 'id'>): DailyMeal => {
  return class DailyMealClass
    extends Record<Readonly<Props>>({
      ...props,
      id: '',
      calendarDate: makeDate(),
    })
    implements DailyMeal {
    static create(initProps: Omit<Props, 'id'>): DailyMeal {
      const id = dailyMealIDFromCalendarDate(initProps.calendarDate);
      return new DailyMealClass({ ...initProps, id });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private constructor(...args: any[]) {
      super(...args);
    }
  }.create(props);
};

export const makeDefaultDailyMeal = (props: {
  calendarDate: CalendarDate;
}): DailyMeal => {
  return makeDailyMeal({
    calendarDate: props.calendarDate,
    breakfast: makeMeal({
      name: '朝食',
      recipes: [],
    }),
    lunch: makeMeal({
      name: '昼食',
      recipes: [],
    }),
    dinner: makeMeal({
      name: '夕食',
      recipes: [],
    }),
    snack: makeMeal({
      name: 'おやつ',
      recipes: [],
    }),
  });
};
