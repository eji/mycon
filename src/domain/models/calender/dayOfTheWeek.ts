export type DayOfTheWeek = '月' | '火' | '水' | '木' | '金' | '土' | '日';
export type DayOfTheWeekIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const dayOfTheWeekTable: Map<DayOfTheWeekIndex, DayOfTheWeek> = new Map([
  [1, '月'],
  [2, '火'],
  [3, '水'],
  [4, '木'],
  [5, '金'],
  [6, '土'],
  [0, '日'],
]);

export const dayOfTheWeekValues = Array.from(dayOfTheWeekTable.values());

export const getDayOfTheWeek = (date: Date): DayOfTheWeek => {
  const result = dayOfTheWeekTable.get(date.getDay() as DayOfTheWeekIndex);
  if (result == null) {
    throw new Error('unexpected date value');
  }
  return result;
};
