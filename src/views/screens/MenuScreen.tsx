import React from "react";
import { Fab, makeStyles, Theme, createStyles, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  const classes = useStyles();

  const handleBack = (): void => {
    history.goBack();
  };

  return (
    <Layout title="献立 (2020年3月4日)" handleBack={handleBack}>
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
