import React, { useContext, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  useTheme,
  useMediaQuery,
  Container,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
  createStyles,
  makeStyles,
  ButtonBase,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Link, useHistory, useParams } from 'react-router-dom';
import * as A from 'fp-ts/lib/Array';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'remeda';
import { appStateContext } from '../AppStateProvider';
import { addRecipeScreenPath } from '../../../routePaths';
import Recipe, { eqRecipe } from '../../../domain/models/recipe';
import {
  calendarDateFromDailyMealID,
  makeDefaultDailyMeal,
  MealType,
} from '../../../domain/models/dailyMeal';
import { saveDailyMeal } from '../../state/appState/allDailyMeals';

const useStyles = makeStyles(() => {
  return createStyles({
    root: {},
    addRecipeLink: {
      textDecoration: 'none',
    },
    addRecipe: {
      color: '#888',
      borderColor: '#888',
      height: '100%',
      width: '100%',
      borderWidth: '3px',
      borderStyle: 'dashed',
      borderRadius: '12px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
    },
    addIcon: {
      width: '60px',
      flex: 1,
    },
    addText: {
      position: 'absolute',
      bottom: 10,
    },
    selectableRecipe: {
      width: '100%',
      height: '100%',
      '&::before': {
        position: 'absolute',
        top: 5,
        right: 5,
        width: 20,
        height: 20,
        borderRadius: 10,
        content: '""',
        borderWidth: 5,
        backgroundColor: '#ddd',
        '&[aria-checked="true"]': {
          backgroundColor: 'limegreen',
        },
      },
      '&[aria-checked="true"]': {
        '&::before': {
          backgroundColor: 'limegreen',
        },
      },
    },
  });
});

const SelectRecipesDialog: React.FC = () => {
  const { appState, dispatch } = useContext(appStateContext);
  const { allDailyMeals, allRecipes } = appState;
  const recipes = Object.values(allRecipes);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [selectedRecipes, setRecipes] = useState<Recipe[]>([]);
  const history = useHistory();
  const { id, mealType } = useParams();

  if (id == null || mealType == null) {
    history.goBack();
    return null;
  }

  const calendarDate = calendarDateFromDailyMealID(id);
  if (calendarDate == null) {
    history.goBack();
    return null;
  }

  const dailyMeal = allDailyMeals[id] || makeDefaultDailyMeal({ calendarDate });

  const handleClose = (): void => {
    history.goBack();
  };

  const handleSelected = async (): Promise<void> => {
    await pipe(
      saveDailyMeal({
        dailyMeal,
        mealType: mealType as MealType,
        recipes: selectedRecipes,
      }),
      TE.map(dispatch),
      TE.map(handleClose),
      TE.mapLeft((): void => console.log('hogeeeeeeeeee'))
    )();
  };

  return (
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="レシピを選択"
      fullScreen={fullScreen}
    >
      <>
        <DialogTitle id="select-ingredient">レシピを選択</DialogTitle>
        <DialogContent>
          <DialogContentText>レシピを選択してください</DialogContentText>
          <Container />
          <GridList cellHeight={180}>
            <GridListTile key="add-recipe">
              <Link
                to={addRecipeScreenPath()}
                className={classes.addRecipeLink}
              >
                <ButtonBase className={classes.addRecipe}>
                  <AddIcon className={classes.addIcon} />
                  <Typography className={classes.addText}>
                    レシピを作成する
                  </Typography>
                </ButtonBase>
              </Link>
            </GridListTile>
            {recipes.map(
              (recipe): JSX.Element => {
                const checked = A.elem(eqRecipe)(recipe, selectedRecipes);
                return (
                  <GridListTile>
                    <ButtonBase
                      key={recipe.id}
                      className={classes.selectableRecipe}
                      role="checkbox"
                      aria-checked={checked}
                      onClick={(): void => {
                        if (checked) {
                          setRecipes(
                            selectedRecipes.filter((r) => !recipe.equals(r))
                          );
                        } else {
                          setRecipes([...selectedRecipes, recipe]);
                        }
                      }}
                    >
                      <img src="/images/no_image.jpg" alt={recipe.name} />
                      <GridListTileBar title={recipe.name} />
                    </ButtonBase>
                  </GridListTile>
                );
              }
            )}
          </GridList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleSelected}>
            選択
          </Button>
        </DialogActions>
      </>
    </Dialog>
  );
};

export default SelectRecipesDialog;
