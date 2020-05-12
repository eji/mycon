import React from 'react';
import { useHistory } from 'react-router-dom';
import CalendarDate from '../../../domain/models/calender/calendarDate';
import { addMealScreenPath } from '../../../routePaths';
import NoItemView from '../NoItemView';

type Props = {
  calendarDate: CalendarDate;
};

const NoDailyMeal: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const { calendarDate } = props;

  const handleClick = (): void => {
    history.push(addMealScreenPath({ calendarDate }));
  };

  return (
    <NoItemView
      message="メニューがありません"
      buttonText="メニューを追加する"
      handleClick={handleClick}
    />
  );
};

export default NoDailyMeal;
