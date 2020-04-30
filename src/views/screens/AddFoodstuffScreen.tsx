import React, { useContext, ReactElement } from 'react';
import { Formik, Form, Field } from 'formik';
import { pipe } from 'fp-ts/lib/pipeable';
import { map, mapLeft } from 'fp-ts/lib/TaskEither';
import { TextField } from 'formik-material-ui';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { appStateContext } from '../components/AppStateProvider';
import {
  AddFoodstuffForm,
  AddFoodstuffFormSchema,
} from '../forms/addFoodstuffFormSchema';
import { addFoodstuff } from '../state/appState/allFoodstuffs';
import CommandError from '../../errors/repositoryErrors/commandError';

type AddFoodstuffScreenProps = {};

const AddFoodstuffScreen: React.FC<AddFoodstuffScreenProps> = () => {
  const history = useHistory();
  const { dispatch } = useContext(appStateContext);

  const initValues: AddFoodstuffForm = {
    name: '',
  };

  const handleSubmit = async (values: AddFoodstuffForm): Promise<void> => {
    await pipe(
      addFoodstuff(values),
      map(dispatch),
      map(() => history.goBack()),
      mapLeft((error: CommandError) => console.log(error))
    )();
  };

  return (
    <Layout title="食材の追加">
      <Formik
        initialValues={initValues}
        validationSchema={AddFoodstuffFormSchema}
        validateOnChange={false}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isSubmitting }): ReactElement => (
          <Form>
            <Field
              components={TextField}
              name="name"
              type="text"
              label="食材名"
            />
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
            >
              登録
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default AddFoodstuffScreen;
