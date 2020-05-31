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
import { useHistory, useParams } from 'react-router-dom';
import { isUndefined } from 'util';
import Layout from '../layouts/Layout';
import { appStateContext } from '../components/AppStateProvider';
import {
  SaveFamilyMemberForm,
  saveFamilyMemberFormSchema,
} from '../forms/saveFamilyMemberFormSchema';
import { saveFamilyMember } from '../state/appState/allFamilyMembers';
import AppError from '../../errors/AppError';

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

type EditFamilyMemberScreenProps = {};

const EditFamilyMemberScreen: React.FC<EditFamilyMemberScreenProps> = () => {
  const history = useHistory();
  const classes = useStyles();
  const { dispatch } = useContext(appStateContext);
  const { id } = useParams();

  const isNew = isUndefined(id);

  const initValues: SaveFamilyMemberForm = {
    name: '',
  };

  const handleBack = (): void => {
    history.goBack();
  };

  const handleSubmit = async (values: SaveFamilyMemberForm): Promise<void> => {
    await pipe(
      saveFamilyMember({ ...values, id }),
      map(dispatch),
      map(handleBack),
      mapLeft((error: AppError) => console.log(error))
    )();
  };

  return (
    <Layout
      title={`家族の${isNew ? '追加' : '更新'}`}
      handleBack={handleBack}
      hideBottomNavi
    >
      <Formik
        initialValues={initValues}
        validationSchema={saveFamilyMemberFormSchema}
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
                  label="家族の名前"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                />
              </div>
            </div>
            <ButtonBase
              type="button"
              disabled={isSubmitting}
              className={classes.button}
              onClick={submitForm}
            >
              <Typography>{isNew ? '登録' : '更新'}</Typography>
            </ButtonBase>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default EditFamilyMemberScreen;
