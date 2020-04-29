import React from 'react';
import {
  Button,
  Box,
  Typography,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import CalendarDate from '../../../domain/models/calender/calenderDate';
import {
  makeEditDailyMenuScreenPath,
  addRecipesScreenPath,
} from '../../../routePaths';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
    textArea: {
      flex: 3,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginBottom: theme.spacing(3),
    },
    buttonArea: {
      flex: 2,
    },
  })
);

type NoRecipeProps = {};

const NoRecipe: React.FC<NoRecipeProps> = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleClick = (): void => {
    history.push(addRecipesScreenPath);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.textArea}>
        <Typography>レシピがありません</Typography>
      </Box>
      <Box className={classes.buttonArea}>
        <Button
          onClick={handleClick}
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
        >
          レシピを作る
        </Button>
      </Box>
    </Box>
  );
};

export default NoRecipe;
