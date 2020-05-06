import React, { useContext, useCallback, useState, ReactElement } from 'react';
import {
  TextField,
  Button,
  Container,
  Table,
  TableContainer,
  createStyles,
  makeStyles,
  Theme,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  ButtonBase,
  Typography,
  Box,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import Layout from '../layouts/Layout';
import { appStateContext } from '../components/AppStateProvider';
import InputRecipeIngredientDialog from '../components/Recipe/InputRecipeIngredientDialog';
import {
  InputRecipeForm,
  inputRecipeFormSchema,
} from '../forms/inputRecipeFormSchema';
import { addRecipe } from '../state/appState/allRecipes';
import SelectRecipesDialog from '../components/Meal/SelectRecipesDialog';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    inputArea: {
      flex: 'auto',
      width: '100%',
      overflowY: 'scroll',
      overflowX: 'hidden',
      padding: theme.spacing(1),
    },
    tableContainer: {
      width: '100%',
    },
    table: {},
    button: {
      height: 40,
      width: '100%',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  })
);

type Props = {};

const AddMealScreen: React.FC<Props> = () => {
  const { appState, dispatch } = useContext(appStateContext);
  const { allRecipes } = appState;
  const recipes = Object.values(allRecipes);
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const handleBack = useCallback((): void => history.goBack(), [history]);

  const openInputRecipeIngredientDialog = (): unknown => setOpen(true);
  const closeInputRecipeIngredientDialog = (): unknown => setOpen(false);

  const initValues: InputRecipeForm = {
    name: '',
    ingredients: [],
  };

  return (
    <Layout title="食事の追加" hideBottomNavi handleBack={handleBack}>
      <Formik
        initialValues={initValues}
        validationSchema={inputRecipeFormSchema}
        validateOnChange={false}
        onSubmit={async (values): Promise<void> => {
          // await pipe(
          //   addRecipe({ form: values, allFoodstuffs }),
          //   TE.map(dispatch),
          //   TE.map(() => history.goBack()),
          //   TE.mapLeft((error) => console.log(error))
          // )();
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
            <Box className={classes.root}>
              <Box className={classes.inputArea}>
                <TextField
                  name="name"
                  type="text"
                  label="食事名"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Typography>レシピ一覧</Typography>
                <Container>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={openInputRecipeIngredientDialog}
                  >
                    レシピを選択
                  </Button>
                </Container>
              </Box>
              <ButtonBase
                type="button"
                disabled={isSubmitting}
                className={classes.button}
                onClick={submitForm}
              >
                <Typography>登録</Typography>
              </ButtonBase>
            </Box>
            <SelectRecipesDialog
              open={open}
              handleClose={closeInputRecipeIngredientDialog}
              handleSelected={(ingredient: {
                foodstuffID: string;
                quantity: string;
              }): void => {
                setFieldValue('ingredients', [
                  ...values.ingredients,
                  ingredient,
                ]);
                closeInputRecipeIngredientDialog();
              }}
              initValues={null}
            />
          </>
        )}
      </Formik>
    </Layout>
  );
};

export default AddMealScreen;
