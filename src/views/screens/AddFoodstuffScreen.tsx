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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    inputArea: {
      flex: 1,
      width: '100%',
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
