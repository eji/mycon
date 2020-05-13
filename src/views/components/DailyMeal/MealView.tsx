import React from 'react';
import {
  Typography,
  createStyles,
  makeStyles,
  Paper,
  Toolbar,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import RecipesList from '../Recipe/RecipesList';
import AddButton from '../common/AddButton';
import { addRecipeToDailyMenuDialogPath } from '../../../routePaths';
import DailyMeal, { MealType } from '../../../domain/models/dailyMeal';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    mealTitle: {
      flexGrow: 1,
    },
  })
);

type Props = {
  dailyMeal: DailyMeal;
  mealType: MealType;
};

const MealView: React.FC<Props> = (props: Props) => {
  const { dailyMeal, mealType } = props;
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();
  const meal = dailyMeal[mealType];

  const handleClick = (): void => {
    history.push(
      addRecipeToDailyMenuDialogPath({
        calendarDate: dailyMeal.calendarDate,
        mealType,
      }),
      { background: location }
    );
  };

  return (
    <>
      <Paper>
        <Toolbar>
          <Typography className={classes.mealTitle}>{meal.name}</Typography>
          <AddButton onClick={handleClick} />
        </Toolbar>
      </Paper>
      <RecipesList recipes={meal.recipes} />
    </>
  );
};

export default MealView;
