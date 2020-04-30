import CalendarDate, {
  makeDate,
} from '../../domain/models/calender/calenderDate';

const dateStrRegexp = /^(\d{4})-(\d{2})-(\d{2})$/;

const calenderDateArray = (dateStrs: string[]): CalendarDate[] => {
  const dates: CalendarDate[] = [];
  dateStrs.forEach((dateStr): void => {
    const match = dateStr.match(dateStrRegexp);
    if (match == null) {
      throw new Error('invalid date format');
    }
    dates.push(
      makeDate({
        year: Number.parseInt(match[1], 10),
        month: Number.parseInt(match[2], 10),
        day: Number.parseInt(match[3], 10),
      })
    );
  });
  return dates;
};

export default calenderDateArray;
