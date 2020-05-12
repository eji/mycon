import React, { useContext } from 'react';
import {
  createStyles,
  makeStyles,
  Box,
  Grid,
  ButtonBase,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { useHistory } from 'react-router-dom';
import { showDailyMealScreenPath } from '../../../routePaths';
import { Week } from '../../../domain/models/calender/week';
import { DayOfTheWeek } from '../../../domain/models/calender/dayOfTheWeek';
import { appStateContext } from '../AppStateProvider';
import { dailyMealIDFromCalendarDate } from '../../../domain/models/dailyMeal';

const useStyle = makeStyles(() =>
  createStyles({
    root: {
      padding: 0,
      height: 90,
      width: '100%',
    },
    day: {
      textAlign: 'center',
      width: '100%',
      fontSize: 18,
    },
    statusDone: {
      color: '#00CC00',
      width: '100%',
    },
  })
);

type MonthlyScheduleTableDayColumnProps = {
  week: Week;
  dayOfTheWeek: DayOfTheWeek;
};

const MonthlyScheduleTableDayColumn: React.FC<MonthlyScheduleTableDayColumnProps> = (
  props: MonthlyScheduleTableDayColumnProps
) => {
  const { appState } = useContext(appStateContext);
  const { allDailyMeals } = appState;
  const history = useHistory();
  const classes = useStyle();
  const { week, dayOfTheWeek } = props;

  const targetDate = week.find((date) => date.dayOfTheWeek === dayOfTheWeek);
  if (targetDate == null) {
    return <></>;
  }

  const dailyMeal = allDailyMeals[dailyMealIDFromCalendarDate(targetDate)];

  const handleClieck = (): void => {
    history.push(showDailyMealScreenPath({ calendarDate: targetDate }));
  };

  return (
    <ButtonBase className={classes.root} onClick={handleClieck}>
      <Grid
        container
        item
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Box className={classes.day}>{targetDate.day}</Box>
        {dailyMeal && (
          <Box className={classes.statusDone}>
            <DoneIcon />
          </Box>
        )}
      </Grid>
    </ButtonBase>
  );
};

export default MonthlyScheduleTableDayColumn;
