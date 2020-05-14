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
import ImageUploader from '../components/common/ImageUploader';

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

type EditRecipeScreenProps = {};

const EditRecipeScreen: React.FC<EditRecipeScreenProps> = () => {
  const { appState, dispatch } = useContext(appStateContext);
  const { allFoodstuffs } = appState;
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
    <Layout title="レシピの追加" hideBottomNavi handleBack={handleBack}>
      <Formik
        initialValues={initValues}
        validationSchema={inputRecipeFormSchema}
        validateOnChange={false}
        onSubmit={async (values): Promise<void> => {
          await pipe(
            addRecipe({ form: values, allFoodstuffs }),
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
                  label="レシピ名"
                  fullWidth
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ImageUploader
                  dialogTitle="レシピの画像"
                  handleUploadImage={(): void => {}}
                />
                <Typography>材料</Typography>
                <TableContainer
                  component={Paper}
                  className={classes.tableContainer}
                >
                  <Table
                    className={classes.table}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>食材</TableCell>
                        <TableCell align="right">分量</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.ingredients.map((ingredient) => (
                        <TableRow
                          key={`${ingredient.foodstuffID}_${ingredient.quantity}`}
                        >
                          <TableCell component="th" scope="row">
                            {allFoodstuffs[ingredient.foodstuffID]?.name}
                          </TableCell>
                          <TableCell align="right">
                            {ingredient.quantity}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Container>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={openInputRecipeIngredientDialog}
                  >
                    材料を追加
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
            <InputRecipeIngredientDialog
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

export default EditRecipeScreen;
