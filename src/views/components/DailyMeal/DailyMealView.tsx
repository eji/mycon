import React from 'react';
import { makeStyles, createStyles, Box } from '@material-ui/core';
import DailyMeal from '../../../domain/models/dailyMeal';
import MealView from './MealView';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      overflowY: 'scroll',
    },
    menuItemList: {},
  })
);

type Props = {
  dailyMeal: DailyMeal;
};

const DailyMealView: React.FC<Props> = (props: Props) => {
  const { dailyMeal } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {dailyMeal.meals.map((meal) => (
        <MealView meal={meal} />
      ))}
    </Box>
  );
};

export default DailyMealView;
