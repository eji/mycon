import React, { useContext } from 'react';
import { Box, makeStyles, createStyles, Theme } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { appStateContext } from '../components/AppStateProvider';
import { scheduleScreenPath } from '../../routePaths';
import {
  calendarDateFromDailyMealID,
  makeDefaultDailyMeal,
  mealTypes,
} from '../../domain/models/dailyMeal';
import MealView from '../components/DailyMeal/MealView';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      overflowY: 'scroll',
      padding: theme.spacing(1),
    },
    meal: {
      marginBottom: theme.spacing(3),
    },
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
        {mealTypes.map(
          (mealType): JSX.Element => (
            <div className={classes.meal}>
              <MealView dailyMeal={dailyMeal} mealType={mealType} />
            </div>
          )
        )}
      </Box>
    </Layout>
  );
};

export default DailyMealScreen;
