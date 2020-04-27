import * as R from "remeda";

/**
 *  月の日の一覧を返す
 */
const datesOfMonth = (year: number, month: number): Date[] => {
  const monthIndex = month - 1;
  const nextMonthIndex = monthIndex + 1;
  const lastDayOfMonth = new Date(year, nextMonthIndex, 0);
  return R.times(
    lastDayOfMonth.getDate(),
    (index) => new Date(year, monthIndex, index + 1)
  );
};

export default datesOfMonth;
