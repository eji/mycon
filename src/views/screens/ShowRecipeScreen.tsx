import React, { useContext } from 'react';
import {
  Typography,
  Container,
  createStyles,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import { appStateContext } from '../components/AppStateProvider';
import { foodstuffsScreenPath } from '../../routePaths';
import Layout from '../layouts/Layout';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      textAlign: 'center',
    },
    section: {},
  })
);

const ShowRecipeScreen: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const { appState } = useContext(appStateContext);
  const { id } = useParams();
  if (id == null) {
    history.replace(foodstuffsScreenPath());
    return null;
  }

  const { allRecipes } = appState;
  const recipe = allRecipes[id];
  if (recipe == null) {
    history.replace(foodstuffsScreenPath());
    return null;
  }

  return (
    <Layout title={recipe.name} hideBottomNavi handleBack={history.goBack}>
      <Container className={classes.root} />
    </Layout>
  );
};

export default ShowRecipeScreen;
