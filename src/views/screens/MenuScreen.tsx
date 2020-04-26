import React from "react";
import { Fab, makeStyles, Theme, createStyles, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Layout from "../layouts/Layout";
import MenuItemList from "../components/Menu/MenuItemList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    menuItemList: {},
    fab: {
      position: "fixed",
      bottom: theme.spacing(8),
      right: theme.spacing(2),
    },
  })
);

type MenuScreenProps = {};

const MenuScreen: React.FC<MenuScreenProps> = () => {
  const classes = useStyles();

  return (
    <Layout title="献立 (2020年3月4日)">
      <Box className={classes.root}>
        <MenuItemList />
        <Fab color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>
      </Box>
    </Layout>
  );
};

export default MenuScreen;
