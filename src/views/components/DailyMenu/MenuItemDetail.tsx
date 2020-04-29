import React from "react";
import {
  makeStyles,
  createStyles,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Button,
  Box,
  Typography,
  Grid,
  Theme,
} from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },
    contentHeader: {
      padding: theme.spacing(1),
    },
    closeButton: {
      position: "absolute",
      bottom: 0,
      alignSelf: "flex-end",
      width: "100%",
    },
  })
);

type MenuItemDetailProps = {
  handleClose: () => void;
};

const MenuItemDetail: React.FC<MenuItemDetailProps> = (
  props: MenuItemDetailProps
) => {
  const { handleClose } = props;
  const classes = useStyle();
  const rows = [
    {
      name: "お米",
      quantity: "100g",
    },
    {
      name: "お米",
      quantity: "100g",
    },
    {
      name: "お米",
      quantity: "100g",
    },
    {
      name: "お米",
      quantity: "100g",
    },
  ];

  return (
    <Box className={classes.root}>
      <Grid container item xs={12} direction="column">
        <Typography className={classes.contentHeader}>材料</Typography>
        <Table>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Button
        onClick={handleClose}
        variant="contained"
        color="inherit"
        className={classes.closeButton}
      >
        閉じる
      </Button>
    </Box>
  );
};

export default MenuItemDetail;
