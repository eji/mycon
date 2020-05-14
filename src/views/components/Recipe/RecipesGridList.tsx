import React from 'react';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  ButtonBase,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Recipe from '../../../domain/models/recipe';
import { showRecipeScreenPath } from '../../../routePaths';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    button: {
      width: '100%',
      height: '100%',
    },
  })
);

type RecipesListProps = {
  recipes: Recipe[];
};

const RecipesGridList: React.FC<RecipesListProps> = (
  props: RecipesListProps
) => {
  const { recipes } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <GridList cellHeight={180} className={classes.root}>
      {recipes.map((recipe) => (
        <GridListTile key={recipe.id}>
          <ButtonBase
            className={classes.button}
            onClick={(): void => {
              history.push(showRecipeScreenPath({ id: recipe.id }));
            }}
          >
            <img src="/images/no_image.jpg" alt={recipe.name} />
            <GridListTileBar title={recipe.name} />
          </ButtonBase>
        </GridListTile>
      ))}
    </GridList>
  );
};

export default RecipesGridList;
