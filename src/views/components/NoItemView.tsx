import React from 'react';
import {
  Button,
  Box,
  Typography,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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

type NoItemViewProps = {
  message: string;
  buttonText: string;
  handleClick: () => void;
};

const NoItemView: React.FC<NoItemViewProps> = (props: NoItemViewProps) => {
  const { message, buttonText, handleClick } = props;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.textArea}>
        <Typography color="textPrimary">{message}</Typography>
      </Box>
      <Box className={classes.buttonArea}>
        <Button
          onClick={handleClick}
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
};

export default NoItemView;
