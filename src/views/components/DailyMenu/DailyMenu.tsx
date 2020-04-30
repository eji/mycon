import React from 'react';
import { Fab, makeStyles, Theme, createStyles, Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MenuItemList from './MenuItemList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      overflowY: 'scroll',
    },
    menuItemList: {},
    fab: {
      position: 'fixed',
      bottom: theme.spacing(8),
      right: theme.spacing(2),
    },
  })
);

type DailyMenuProps = {};

const DailyMenu: React.FC<DailyMenuProps> = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <MenuItemList />
      <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default DailyMenu;
