import React, { ReactElement } from 'react';
import firebase from 'firebase';
import * as TE from 'fp-ts/lib/TaskEither';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  makeStyles,
  Theme,
  CssBaseline,
  Paper,
  Avatar,
  TextField,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik, Form } from 'formik';
import { container } from 'tsyringe';
import { pipe } from 'fp-ts/lib/pipeable';
import SignInWithEmailAndPasswordViaFirebaseService from '../../app/services/signInWithEmailAndPasswordViaFirebaseService';
import { signInWithEmailAndPasswordFormSchema } from '../forms/signInWithEmailAndPasswordFormSchema';
import firebaseConfig from '../../firebaseConfig';

firebase.initializeApp(firebaseConfig);

const Copyright: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © MyCon MyCon ${new Date().getFullYear()}.`}
    </Typography>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const NewSignInScreen: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();

  const signInService = container.resolve(
    SignInWithEmailAndPasswordViaFirebaseService
  );

  const initValues = {
    email: '',
    password: '',
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={initValues}
            validationSchema={signInWithEmailAndPasswordFormSchema}
            validateOnChange={false}
            onSubmit={async (values): Promise<void> => {
              await pipe(
                signInService.execute(values),
                TE.mapLeft((e) => console.error(e)),
                TE.mapLeft(() => console.error('EEEEEEEEEEE')),
                TE.map(() => console.log('hogeeeeeeeeeeeeeee')),
                TE.map((): unknown => history.replace('/')),
                TE.mapLeft((error): void => {
                  // TODO: 直すこと
                  console.error(error);
                })
              )();
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              submitForm,
              isSubmitting,
            }): ReactElement => (
              <Form className={classes.root}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Sign In
                </Button>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </Form>
            )}
          </Formik>
        </div>
      </Grid>
    </Grid>
  );
};

export default NewSignInScreen;
