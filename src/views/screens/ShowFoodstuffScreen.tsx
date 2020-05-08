import React, { useContext } from 'react';
import {
  Typography,
  Container,
  createStyles,
  makeStyles,
  Theme,
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

const ShowFoodstuffScreen: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const { appState } = useContext(appStateContext);
  const { id } = useParams();
  if (id == null) {
    history.replace(foodstuffsScreenPath());
    return null;
  }

  const { allFoodstuffs } = appState;
  const foodstuff = allFoodstuffs[id];
  if (foodstuff == null) {
    history.replace(foodstuffsScreenPath());
    return null;
  }

  return (
    <Layout title={foodstuff.name} hideBottomNavi handleBack={history.goBack}>
      <Container className={classes.root}>
        <Paper>
          <Typography variant="h6" component="h2" className={classes.section}>
            含有栄養素
          </Typography>
        </Paper>
        {foodstuff.nutrients.map((nutrient) => (
          <Typography>{nutrient}</Typography>
        ))}
      </Container>
    </Layout>
  );
};

export default ShowFoodstuffScreen;
