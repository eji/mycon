import React, { useContext, ReactNode, ReactElement, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
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
  Theme,
  ButtonBase,
} from '@material-ui/core';
import { Autocomplete, RenderInputParams } from '@material-ui/lab';
import { Formik } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import * as A from 'fp-ts/lib/Array';
import { appStateContext } from '../AppStateProvider';
import RecipeIngredient from '../../../domain/models/recipeIngredient';
import { addRecipeScreenPath } from '../../../routePaths';
import Recipe, { eqRecipe } from '../../../domain/models/recipe';

const useStyles = makeStyles((theme: Theme) => {
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

interface Props {
  open: boolean;
  initValues: RecipeIngredient | null;
  handleClose: () => unknown;
  handleSelected: (ingredient: {
    foodstuffID: string;
    quantity: string;
  }) => void;
}

const SelectRecipesDialog: React.FC<Props> = (props: Props) => {
  const { open, handleClose, handleSelected, initValues } = props;
  const { appState } = useContext(appStateContext);
  const { allFoodstuffs, allRecipes } = appState;
  const foodstuffs = Object.values(allFoodstuffs);
  const recipes = Object.values(allRecipes);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  const [selectedRecipes, setRecipes] = useState<Recipe[]>([]);

  return (
    <Dialog
      open={open}
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
                      <img src="/images/no_image.svg" alt={recipe.name} />
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
          <Button color="primary">選択</Button>
        </DialogActions>
      </>
    </Dialog>
  );
};

export default SelectRecipesDialog;
