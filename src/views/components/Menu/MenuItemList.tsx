import React from "react";
import { Grid } from "@material-ui/core";
import MenuItem from "./MenuItem";

type MenuItemListProps = {};

const MenuItemList: React.FC<MenuItemListProps> = () => {
  return (
    <>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={6}>
          <MenuItem />
        </Grid>
        <Grid item xs={6}>
          <MenuItem />
        </Grid>
        <Grid item xs={6}>
          <MenuItem />
        </Grid>
        <Grid item xs={6}>
          <MenuItem />
        </Grid>
      </Grid>
    </>
  );
};

export default MenuItemList;
