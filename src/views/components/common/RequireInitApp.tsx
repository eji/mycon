import React, { useContext, useEffect, ReactNode } from 'react';
import {
  CircularProgress,
  Container,
  createStyles,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';
import { appStateContext } from '../AppStateProvider';
import {
  initializingAppState,
  failedInitializeAppState,
} from '../../state/appState';
import inspect from '../../../utils/taskEitherHelpers';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
  })
);

type Props = {
  children: ReactNode;
};

const RequireInitApp: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { appState, dispatch } = useContext(appStateContext);
  const { initializeAppState } = appState;
  const classes = useStyles();

  useEffect(() => {
    if (initializeAppState === 'not yet') {
      (async (): Promise<void> => {
        dispatch({ type: 'initializeAppState', status: 'initializing' });
        await pipe(
          initializingAppState(),
          TE.map(dispatch),
          TE.mapLeft(() => {
            dispatch(failedInitializeAppState());
          })
        )();
      })();
    }
  }, [initializeAppState]);

  const loadingView = (
    <Container className={classes.root}>
      <Typography>初期化中です</Typography>
      <CircularProgress />
    </Container>
  );

  const failedView = (
    <Container className={classes.root}>
      <Typography>初期化に失敗しました</Typography>
    </Container>
  );

  if (initializeAppState === 'initialized') {
    return <>{children}</>;
  }

  if (initializeAppState === 'failed') {
    return failedView;
  }

  return loadingView;
};

export default RequireInitApp;
