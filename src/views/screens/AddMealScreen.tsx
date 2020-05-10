import React, { useContext, useState, ReactElement } from 'react';
import {
  TextField,
  Button,
  Container,
  createStyles,
  makeStyles,
  Theme,
  ButtonBase,
  Typography,
  Box,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useHistory, useParams, Route } from 'react-router-dom';
import { Formik } from 'formik';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import Layout from '../layouts/Layout';
import SelectRecipesDialog from '../components/Meal/SelectRecipesDialog';
import {
  InputMealForm,
  inputMealFormSchema,
} from '../forms/inputMealFormSchema';
import Recipe from '../../domain/models/recipe';
import RecipesList from '../components/Recipe/RecipesList';
import { addMeal } from '../state/appState/allDailyMenus';
import { calendarDateFromDailyMenuID } from '../../domain/models/dailyMenu';
import { scheduleScreenPath } from '../../routePaths';
import { appStateContext } from '../components/AppStateProvider';

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
  const { allDailyMenus, allRecipes } = appState;
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  if (id == null) {
    history.replace(scheduleScreenPath());
    return <></>;
  }
  const calendarDate = calendarDateFromDailyMenuID(id);
  if (calendarDate == null) {
    history.replace(scheduleScreenPath());
    return <></>;
  }

  const handleBack = (): void => history.goBack();

  const openInputRecipeIngredientDialog = (): unknown => setOpen(true);
  const closeInputRecipeIngredientDialog = (): unknown => setOpen(false);

  const initValues: InputMealForm = {
    name: '',
    recipeIDs: [],
  };

  return (
    <Layout title="食事の追加" hideBottomNavi handleBack={handleBack}>
      <Formik
        initialValues={initValues}
        validationSchema={inputMealFormSchema}
        validateOnChange={false}
        onSubmit={async (values): Promise<void> => {
          await pipe(
            addMeal({ form: values, allDailyMenus, allRecipes, calendarDate }),
            TE.map(dispatch),
            TE.map(() => history.goBack()),
            TE.mapLeft((error) => console.log(error))
          )();
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
                  <RecipesList
                    recipes={values.recipeIDs.map((rid) => allRecipes[rid])}
                  />
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
              handleSelected={(selectedRecipes: Recipe[]): void => {
                setFieldValue(
                  'recipeIDs',
                  selectedRecipes.map((r) => r.id)
                );
                closeInputRecipeIngredientDialog();
              }}
            />
          </>
        )}
      </Formik>
    </Layout>
  );
};

export default AddMealScreen;
