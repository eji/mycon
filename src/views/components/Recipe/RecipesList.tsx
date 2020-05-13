import React from 'react';
import { createStyles, makeStyles, List } from '@material-ui/core';
import Recipe from '../../../domain/models/recipe';
import RecipeListItem from './RecipeListItem';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

type RecipesListProps = {
  recipes: Recipe[];
};

const RecipesList: React.FC<RecipesListProps> = (props: RecipesListProps) => {
  const { recipes } = props;
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {recipes.map((recipe) => (
        <RecipeListItem recipe={recipe} />
      ))}
    </List>
  );
};

export default RecipesList;
