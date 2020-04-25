import React from "react";
import { Fab, makeStyles, Theme, createStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Layout from "../layouts/Layout";
import MenuItemList from "../components/Menu/MenuItemList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

type MenuScreenProps = {};

const MenuScreen: React.FC<MenuScreenProps> = () => {
  const classes = useStyles();

  return (
    <Layout title="献立 (2020年3月4日)">
      <MenuItemList />
      <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </Layout>
  );
};

export default MenuScreen;
