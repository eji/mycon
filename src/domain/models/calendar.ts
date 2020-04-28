import { Record } from "immutable";
import * as R from "remeda";
import { Week } from "./calender/week";
import splitAllWhen from "../../utils/splitAllWhen";
import CalendarDate, { makeDate } from "./calender/calenderDate";

interface CalendarProps {
  year: number;
  currentMonth: number;
}

/**
 * 月めくりカレンダー
 */
export default interface Calendar extends CalendarProps {
  nextMonth(): Calendar;
  prevMonth(): Calendar;
  days(): CalendarDate[];
  weeks(): Week[];
}

class CalendarClass
  extends Record<Readonly<CalendarProps>>({
    year: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
  })
  implements Calendar {
  nextMonth(): Calendar {
    const [nextYear, nextMonth] =
      this.currentMonth === 12
        ? [this.year + 1, 1]
        : [this.year, this.currentMonth + 1];
    return new CalendarClass({
      year: nextYear,
      currentMonth: nextMonth,
    });
  }

  prevMonth(): Calendar {
    const [nextYear, nextMonth] =
      this.currentMonth === 1
        ? [this.year - 1, 12]
        : [this.year, this.currentMonth - 1];
    return new CalendarClass({
      year: nextYear,
      currentMonth: nextMonth,
    });
  }

  private daysCache?: CalendarDate[];

  days(): CalendarDate[] {
    if (this.daysCache == null) {
      const nextMonth = this.currentMonth + 1;
      const lastDayOfMonth = makeDate({
        year: this.year,
        month: nextMonth,
        day: 0,
      });
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      console.log([
        lastDayOfMonth.year,
        lastDayOfMonth.month,
        lastDayOfMonth.day,
      ]);
      this.daysCache = R.times(lastDayOfMonth.day, (index) =>
        makeDate({ year: this.year, month: this.currentMonth, day: index + 1 })
      );
    }
    return this.daysCache;
  }

  weeks(): Week[] {
    return splitAllWhen(this.days(), (day) => day.dayOfTheWeek === "月");
  }
}

export const makeCalendar = (props?: {
  year?: number;
  currentMonth?: number;
}): Calendar => {
  return new CalendarClass(props);
};
