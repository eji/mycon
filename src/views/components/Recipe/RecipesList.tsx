import React from 'react';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import Recipe from '../../../domain/models/recipe';

type RecipesListProps = {
  recipes: Recipe[];
};

const RecipesList: React.FC<RecipesListProps> = (props: RecipesListProps) => {
  const { recipes } = props;

  return (
    <GridList cellHeight={180}>
      {recipes.map((recipe) => (
        <GridListTile key={recipe.id}>
          <img src="/images/no_image.svg" alt={recipe.name} />
          <GridListTileBar title={recipe.name} />
        </GridListTile>
      ))}
    </GridList>
  );
};

export default RecipesList;
