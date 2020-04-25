import React from "react";
import {
  makeStyles,
  createStyles,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Button,
  Box,
} from "@material-ui/core";

const useStyle = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>材料</TableCell>
            <TableCell align="right">分量</TableCell>
          </TableRow>
        </TableHead>
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
