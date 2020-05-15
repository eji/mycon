import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Fab,
  makeStyles,
  Theme,
  createStyles,
  ButtonBase,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { Foodstuff } from '../../../domain/models/foodstuff';
import {
  addFoodstuffScreenPath,
  showFoodstuffScreenPath,
} from '../../../routePaths';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      height: '100%',
      overflowY: 'scroll',
    },
    foodstuffListItem: {},
    foodstuffListItemButton: {
      flexGrow: 1,
      width: '100%',
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
  const history = useHistory();

  const goTo = (path: string): (() => void) => (): void => history.push(path);

  return (
    <div className={classes.root}>
      <List>
        {foodstuffs.map((foodstuff) => (
          <ButtonBase
            className={classes.foodstuffListItemButton}
            onClick={goTo(showFoodstuffScreenPath({ id: foodstuff.id }))}
          >
            <ListItem className={classes.foodstuffListItem}>
              <ListItemText
                primary={foodstuff.name}
                primaryTypographyProps={{ color: 'textPrimary' }}
              />
            </ListItem>
          </ButtonBase>
        ))}
      </List>
      <Fab
        color="primary"
        aria-label="add foodstuff"
        className={classes.fabButton}
        onClick={goTo(addFoodstuffScreenPath())}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default FoodstuffList;
