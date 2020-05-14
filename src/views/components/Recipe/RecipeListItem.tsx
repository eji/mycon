import React, { useCallback } from 'react';
import {
  ButtonBase,
  createStyles,
  makeStyles,
  Card,
  CardActionArea,
  Typography,
  Box,
  Theme,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Recipe from '../../../domain/models/recipe';
import { showRecipeScreenPath } from '../../../routePaths';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
    },
    actionArea: {
      display: 'flex',
      height: 100,
    },
    img: {
      flex: 1,
      height: 'auto',
    },
    contents: {
      flex: 2,
    },
  })
);

type Props = {
  recipe: Recipe;
};

const RecipeListItem: React.FC<Props> = (props: Props) => {
  const { recipe } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleClick = useCallback((): void => {
    history.push(showRecipeScreenPath({ id: recipe.id }));
  }, [recipe]);

  return (
    <Card key={recipe.id} className={classes.root}>
      <CardActionArea className={classes.actionArea} onClick={handleClick}>
        <img
          src="/images/no_image.jpg"
          alt={recipe.name}
          className={classes.img}
        />
        <Box className={classes.contents}>
          <Typography>{recipe.name}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default RecipeListItem;
