import React, { useContext } from 'react';
import { Box, makeStyles, createStyles } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { appStateContext } from '../components/AppStateProvider';
import { scheduleScreenPath } from '../../routePaths';
import {
  calendarDateFromDailyMealID,
  makeDefaultDailyMeal,
} from '../../domain/models/dailyMeal';
import MealView from '../components/DailyMeal/MealView';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      overflowY: 'scroll',
    },
    menuItemList: {},
  })
);

type Props = {};

const DailyMealScreen: React.FC<Props> = () => {
  const { id } = useParams();
  const { appState } = useContext(appStateContext);
  const { allDailyMeals } = appState;
  const history = useHistory();
  const classes = useStyles();

  if (id == null) {
    history.replace(scheduleScreenPath());
    return <></>;
  }

  const calendarDate = calendarDateFromDailyMealID(id);
  if (calendarDate == null) {
    history.replace(scheduleScreenPath());
    return <></>;
  }

  const title = `${calendarDate.year}年${calendarDate.month}月${calendarDate.day}日(${calendarDate.dayOfTheWeek})`;

  const dailyMeal = allDailyMeals[id] || makeDefaultDailyMeal({ calendarDate });

  const handleBack = (): void => history.goBack();

  return (
    <Layout title={title} handleBack={handleBack}>
      <Box className={classes.root}>
        <MealView dailyMeal={dailyMeal} mealType="breakfast" />
        <MealView dailyMeal={dailyMeal} mealType="lunch" />
        <MealView dailyMeal={dailyMeal} mealType="dinner" />
        <MealView dailyMeal={dailyMeal} mealType="snack" />
      </Box>
      );
    </Layout>
  );
};

export default DailyMealScreen;
