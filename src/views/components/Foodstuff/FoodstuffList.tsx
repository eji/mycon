import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Fab,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { Foodstuff } from '../../../domain/models/foodstuff';
import { addFoodstuffScreenPath } from '../../../routePaths';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      height: '100%',
      overflowY: 'scroll',
    },
    fabButton: {
      position: 'absolute',
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  })
);

type FoodstuffListProps = {
  foodstuffs: Foodstuff[];
};

const FoodstuffList: React.FC<FoodstuffListProps> = (
  props: FoodstuffListProps
) => {
  const { foodstuffs } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List>
        {foodstuffs.map((foodstuff) => (
          <ListItem>
            <ListItemText primary={foodstuff.name} />
          </ListItem>
        ))}
      </List>
      <Link
        to={{
          pathname: addFoodstuffScreenPath,
        }}
      >
        <Fab
          color="primary"
          aria-label="add foodstuff"
          className={classes.fabButton}
        >
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
};

export default FoodstuffList;
