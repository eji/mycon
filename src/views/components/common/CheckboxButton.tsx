import React from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  Typography,
  ButtonBase,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => {
  const height = 30;
  const cornerPadding = height / 2;

  const cornerStyle = {
    position: 'absolute',
    content: '""',
    height: '100%',
    width: '100%',
    top: 0,
    borderRadius: height / 2,
    borderColor: 'blue',
    border: 3,
    borderStyle: 'solid',
    color: 'white',
    zIndex: -1,
  };

  return createStyles({
    root: {
      position: 'relative',
      height,
      paddingLeft: cornerPadding,
      paddingRight: cornerPadding,
      '&[aria-checked="true"]': {
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          '&::before': {
            ...cornerStyle,
            backgroundColor: 'limegreen',
            borderColor: 'limegreen',
          },
        },
        '&::before': {
          ...cornerStyle,
          backgroundColor: 'seagreen',
          borderColor: 'seagreen',
        },
      },
      '&[aria-checked="false"]': {
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          '&::before': {
            ...cornerStyle,
            color: 'black',
            backgroundColor: 'lightslategrey',
            borderColor: 'lightslategrey',
          },
        },
        '&::before': {
          ...cornerStyle,
          color: 'black',
          backgroundColor: 'slategrey',
          borderColor: 'slategrey',
        },
      },
    },
    text: {},
  });
});

type CheckboxButtonProps = {
  text: string;
  handleChecked?: () => void;
  checked?: boolean;
};

const CheckboxButton: React.FC<CheckboxButtonProps> = (
  props: CheckboxButtonProps
) => {
  const { text, checked, handleChecked } = props;
  const classes = useStyles();
  const checkedStatus = checked == null ? false : checked;
  return (
    <>
      <ButtonBase
        className={classes.root}
        role="checkbox"
        aria-checked={checkedStatus}
        onClick={handleChecked}
      >
        <Typography className={classes.text}>{text}</Typography>
      </ButtonBase>
    </>
  );
};

export default CheckboxButton;
