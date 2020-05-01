import React, { useContext, ReactElement } from 'react';
import { Formik, Form } from 'formik';
import { pipe } from 'fp-ts/lib/pipeable';
import { map, mapLeft } from 'fp-ts/lib/TaskEither';
import {
  makeStyles,
  Theme,
  createStyles,
  ButtonBase,
  Typography,
  TextField,
  Divider,
  Grid,
  Box,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { appStateContext } from '../components/AppStateProvider';
import {
  AddFoodstuffForm,
  AddFoodstuffFormSchema,
} from '../forms/addFoodstuffFormSchema';
import { addFoodstuff } from '../state/appState/allFoodstuffs';
import CommandError from '../../errors/repositoryErrors/commandError';
import CheckboxButton from '../components/common/CheckboxButton';
import Nutrient, {
  WATER_SOLUBLE_VITAMINS,
  FAT_SOLUBLE_VITAMINS,
  MINERALS,
  FATS,
  CARBOHYDRATES,
  PROTEINS,
} from '../../domain/models/nutrient';

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
    },
    textField: {
      width: '100%',
    },
    nutrients: {
      marginTop: theme.spacing(2),
    },
    nutrientCategory: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    nutrientCategorySection: {
      marginLeft: theme.spacing(1),
    },
    nutrientItem: {
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
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

type AddFoodstuffScreenProps = {};

const AddFoodstuffScreen: React.FC<AddFoodstuffScreenProps> = () => {
  const history = useHistory();
  const classes = useStyles();
  const { dispatch } = useContext(appStateContext);

  const initValues: AddFoodstuffForm = {
    name: '',
    nutrients: [],
  };

  const handleBack = (): void => {
    history.goBack();
  };

  const handleSubmit = async (values: AddFoodstuffForm): Promise<void> => {
    await pipe(
      addFoodstuff(values),
      map(dispatch),
      map(handleBack),
      mapLeft((error: CommandError) => console.log(error))
    )();
  };
  const nutrientList = (params: {
    section: string;
    nutrients: Nutrient[];
  }): JSX.Element => (
    <>
      <Divider variant="fullWidth" />
      <Typography className={classes.nutrientCategorySection}>
        {params.section}
      </Typography>
      <Grid item className={classes.nutrientCategory}>
        {params.nutrients.map((nutrient) => (
          <Box className={classes.nutrientItem}>
            <CheckboxButton text={nutrient} checked />
          </Box>
        ))}
      </Grid>
    </>
  );

  return (
    <Layout title="食材の追加" handleBack={handleBack} hideBottomNavi>
      <Formik
        initialValues={initValues}
        validationSchema={AddFoodstuffFormSchema}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleBlur,
          submitForm,
          isSubmitting,
        }): ReactElement => (
          <Form className={classes.root}>
            <div className={classes.inputArea}>
              <div className={classes.textField}>
                <TextField
                  type="text"
                  name="name"
                  label="食材名"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </div>
              <Grid
                container
                xs={12}
                direction="column"
                alignItems="stretch"
                justify="flex-start"
                spacing={2}
                className={classes.nutrients}
              >
                {nutrientList({
                  section: '炭水化物',
                  nutrients: CARBOHYDRATES,
                })}
                {nutrientList({ section: 'タンパク質', nutrients: PROTEINS })}
                {nutrientList({ section: '脂質', nutrients: FATS })}
                {nutrientList({ section: 'ミネラル', nutrients: MINERALS })}
                {nutrientList({
                  section: '脂溶性ビタミン',
                  nutrients: FAT_SOLUBLE_VITAMINS,
                })}
                {nutrientList({
                  section: '水溶性ビタミン',
                  nutrients: WATER_SOLUBLE_VITAMINS,
                })}
              </Grid>
            </div>
            <ButtonBase
              type="button"
              disabled={isSubmitting}
              className={classes.button}
              onClick={submitForm}
            >
              <Typography>登録</Typography>
            </ButtonBase>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default AddFoodstuffScreen;
