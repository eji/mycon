import React, { useContext, ReactNode, ReactElement } from 'react';
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
} from '@material-ui/core';
import { Autocomplete, RenderInputParams } from '@material-ui/lab';
import { Formik } from 'formik';
import { appStateContext } from '../AppStateProvider';
import { Foodstuff } from '../../../domain/models/foodstuff';
import RecipeIngredient from '../../../domain/models/recipeIngredient';
import { inputRecipeIngredientFormSchema } from '../../forms/inputRecipeIngredientSchema';

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
  const { allFoodstuffs } = appState;
  const foodstuffs = Object.values(allFoodstuffs);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
