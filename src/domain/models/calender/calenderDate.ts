import { Eq } from "fp-ts/lib/Eq";
import { Record } from "immutable";
import { Show } from "fp-ts/lib/Show";
import { DayOfTheWeek, getDayOfTheWeek } from "./dayOfTheWeek";

/**
 * 面倒くさいから日本のタイムゾーンに固定
 */
const timezoneOffset = 9;

interface CalendarDateProps {
  year: number;
  month: number;
  day: number;
}

export default interface CalendarDate
  extends Readonly<CalendarDateProps>,
    Eq<CalendarDate> {
  dayOfTheWeek: DayOfTheWeek;
}

class CalendarDateClass
  extends Record<CalendarDateProps>({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
  })
  implements CalendarDate {
  static create(props: CalendarDateProps): CalendarDate {
    const date = new Date(
      props.year,
      props.month - 1,
      props.day,
      timezoneOffset,
      0,
      0
    );
    return new CalendarDateClass({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private constructor(...args: any[]) {
    super(...args);
  }

  get dayOfTheWeek(): DayOfTheWeek {
    return getDayOfTheWeek(this.date);
  }

  private dateCache?: Date;

  private get date(): Date {
    if (this.dateCache == null) {
      this.dateCache = new Date(
        this.year,
        this.monthIndex,
        this.day,
        timezoneOffset,
        0,
        0
      );
    }
    return this.dateCache;
  }

  private get monthIndex(): number {
    return this.month - 1;
  }
}

export const makeDate = (props: CalendarDateProps): CalendarDate =>
  CalendarDateClass.create(props);