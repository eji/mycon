import React, { useContext } from 'react';
import {
  makeStyles,
  createStyles,
  Box,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import MonthlyScheduleTableDayColumn from './MonthlyScheduleTableDayColumn';
import { appStateContext } from '../AppStateProvider';
import { dayOfTheWeekValues } from '../../../domain/models/calender/dayOfTheWeek';
import {
  selectPrevMonth,
  selectNextMonth,
} from '../../state/appState/calendar';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    controlBar: {
      height: 70,
      textAlign: 'center',
    },
  })
);

type MonthlyScheduleTableProps = {};

const MonthlyScheduleTable: React.FC<MonthlyScheduleTableProps> = () => {
  const classes = useStyles();
  const { appState, dispatch } = useContext(appStateContext);
  const { calendar } = appState;

  const goToPrevMonth = async (): Promise<void> => {
    await selectPrevMonth(dispatch);
  };

  const goToNextMonth = async (): Promise<void> => {
    await selectNextMonth(dispatch);
  };

  return (
    <Box className={classes.root}>
      <Grid
        container
        xs={12}
        justify="center"
        alignItems="center"
        className={classes.controlBar}
      >
        <Grid item xs={2}>
          <IconButton onClick={goToPrevMonth}>
            <ArrowBackIosIcon />
          </IconButton>
        </Grid>
        <Grid item xs>
          <Typography color="textPrimary">
            {`${calendar.year}年${calendar.currentMonth}月`}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={goToNextMonth}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {dayOfTheWeekValues.map((dayOfTheWeek) => (
              <TableCell>{dayOfTheWeek}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {calendar.weeks().map((week) => (
            <TableRow>
              {dayOfTheWeekValues.map((dayOfTheWeek) => (
                <TableCell component="th" scope="row" padding="none">
                  <MonthlyScheduleTableDayColumn
                    dayOfTheWeek={dayOfTheWeek}
                    week={week}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default MonthlyScheduleTable;
