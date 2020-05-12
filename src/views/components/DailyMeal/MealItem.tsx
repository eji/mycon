import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  makeStyles,
  createStyles,
  CardActionArea,
  Dialog,
  Slide,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import MealItemDetail from './MealItemDetail';

const useStyle = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      //   height: 0,
      width: '100%',
      paddingTop: '56.25%', // 16:9
    },
  })
);

const Transition = React.forwardRef(
  (
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
  ) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

type Props = {};

const MealItem: React.FC<Props> = () => {
  const classes = useStyle();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = (): void => {
    setDialogOpen(true);
  };

  const handleClose = (): void => {
    setDialogOpen(false);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader title="おかゆ" />
        <CardActionArea onClick={handleOpen}>
          <CardMedia image="/images/no_image.svg" className={classes.media} />
        </CardActionArea>
      </Card>
      <Dialog
        fullScreen
        open={dialogOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <MealItemDetail handleClose={handleClose} />
      </Dialog>
    </>
  );
};

export default MealItem;
