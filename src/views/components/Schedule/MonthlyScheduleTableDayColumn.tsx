import React from 'react';
import {
  createStyles,
  makeStyles,
  Box,
  Grid,
  ButtonBase,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { useHistory } from 'react-router-dom';
import { makeDailyMenuScreenPath } from '../../../routePaths';
import { Week } from '../../../domain/models/calender/week';
import { DayOfTheWeek } from '../../../domain/models/calender/dayOfTheWeek';

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
  const history = useHistory();
  const classes = useStyle();
  const { week, dayOfTheWeek } = props;

  const targetDate = week.find((date) => date.dayOfTheWeek === dayOfTheWeek);

  if (targetDate == null) {
    return <></>;
  }

  const handleClieck = (): void => {
    history.push(makeDailyMenuScreenPath({ calendarDate: targetDate }));
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
        <Box className={classes.statusDone}>
          <DoneIcon />
        </Box>
      </Grid>
    </ButtonBase>
  );
};

export default MonthlyScheduleTableDayColumn;
