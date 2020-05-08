import React from 'react';
import { makeStyles, createStyles, Box } from '@material-ui/core';
import DailyMenu from '../../../domain/models/dailyMenu';
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
  dailyMenu: DailyMenu;
};

const DailyMenuView: React.FC<Props> = (props: Props) => {
  const { dailyMenu } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {dailyMenu.meals.map((meal) => (
        <MealView meal={meal} />
      ))}
    </Box>
  );
};

export default DailyMenuView;
