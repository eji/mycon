import React from 'react';
import {
  Typography,
  createStyles,
  makeStyles,
  Paper,
  Toolbar,
} from '@material-ui/core';
import Meal from '../../../domain/models/meal';
import RecipesList from '../Recipe/RecipesList';
import AddButton from '../common/AddButton';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    mealTitle: {
      flexGrow: 1,
    },
  })
);

type Props = {
  meal: Meal;
};

const MealView: React.FC<Props> = (props: Props) => {
  const { meal } = props;
  const classes = useStyles();

  return (
    <>
      <Paper>
        <Toolbar>
          <Typography className={classes.mealTitle}>{meal.name}</Typography>
          <AddButton onClick={(): void => {}} />
        </Toolbar>
      </Paper>
      <RecipesList recipes={meal.recipes} />
    </>
  );
};

export default MealView;
