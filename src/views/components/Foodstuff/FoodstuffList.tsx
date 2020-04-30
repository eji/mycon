import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Foodstuff from '../../../domain/models/foodstuff';

type FoodstuffListProps = {
  foodstuffs: Foodstuff[];
};

const FoodstuffList: React.FC<FoodstuffListProps> = (
  props: FoodstuffListProps
) => {
  const { foodstuffs } = props;
  return (
    <List>
      {foodstuffs.map((foodstuff) => (
        <ListItem>
          <ListItemText primary={foodstuff} />
        </ListItem>
      ))}
    </List>
  );
};

export default FoodstuffList;
