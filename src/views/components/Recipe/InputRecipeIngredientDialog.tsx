import React, { useContext, ReactNode, ReactElement } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Autocomplete, RenderInputParams } from '@material-ui/lab';
import { Formik } from 'formik';
import { appStateContext } from '../AppStateProvider';
import { Foodstuff } from '../../../domain/models/foodstuff';
import RecipeIngredient from '../../../domain/models/recipeIngredient';
import { inputRecipeIngredientFormSchema } from '../../forms/inputRecipeIngredientSchema';

interface InputRecipeIngredientDialogProps {
  open: boolean;
  initValues: RecipeIngredient | null;
  handleClose: () => unknown;
  handleSelected: (ingredient: {
    foodstuffID: string;
    quantity: string;
  }) => void;
}

const InputRecipeIngredientDialog: React.FC<InputRecipeIngredientDialogProps> = (
  props: InputRecipeIngredientDialogProps
) => {
  const { open, handleClose, handleSelected, initValues } = props;
  const { appState } = useContext(appStateContext);
  const { allFoodstuffs } = appState;
  const foodstuffs = Object.values(allFoodstuffs);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="Select a ingredient dialog"
    >
      <Formik
        initialValues={{
          foodstuffID: initValues?.foodstuff?.id || '',
          quantity: initValues?.quantity || '',
        }}
        validationSchema={inputRecipeIngredientFormSchema}
        validateOnChange={false}
        onSubmit={(values): void => {
          handleSelected(values);
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          submitForm,
          isSubmitting,
          setFieldValue,
        }): ReactElement => (
          <>
            <DialogTitle id="select-ingredient">材料を選択</DialogTitle>
            <DialogContent>
              <DialogContentText>
                レシピに追加する材料と分量を入力してください。
              </DialogContentText>
              <Autocomplete
                id="combo-box-demo"
                options={foodstuffs}
                value={
                  (typeof values.foodstuffID !== 'undefined' &&
                    allFoodstuffs[values.foodstuffID]) ||
                  null
                }
                onChange={(
                  event: unknown,
                  newValue: Foodstuff | null
                ): void => {
                  setFieldValue('foodstuffID', newValue?.id);
                }}
                getOptionLabel={(foodstuff: Foodstuff): string => {
                  return foodstuff.name;
                }}
                style={{ width: 300 }}
                renderInput={(params: RenderInputParams): ReactNode => (
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  <TextField {...params} label="食材" variant="outlined" />
                )}
              />
              <TextField
                name="quantity"
                label="分量"
                fullWidth
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.quantity}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button
                onClick={submitForm}
                color="primary"
                disabled={isSubmitting}
              >
                選択
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default InputRecipeIngredientDialog;
