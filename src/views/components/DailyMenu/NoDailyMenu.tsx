import React from "react";
import {
  Button,
  Box,
  Typography,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import CalendarDate from "../../../domain/models/calender/calenderDate";
import { makeEditDailyMenuScreenPath } from "../../../routePaths";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    },
    textArea: {
      flex: 3,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      marginBottom: theme.spacing(3),
    },
    buttonArea: {
      flex: 2,
    },
  })
);

type NoDailyMenuProps = {
  calendarDate: CalendarDate;
};

const NoDailyMenu: React.FC<NoDailyMenuProps> = (props: NoDailyMenuProps) => {
  const history = useHistory();
  const { calendarDate } = props;
  const classes = useStyles();

  const handleClick = (): void => {
    history.push(makeEditDailyMenuScreenPath({ calendarDate }));
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.textArea}>
        <Typography>まだメニューが存在しません</Typography>
      </Box>
      <Box className={classes.buttonArea}>
        <Button
          onClick={handleClick}
          color="primary"
          variant="contained"
          startIcon={<AddIcon />}
        >
          メニューを作る
        </Button>
      </Box>
    </Box>
  );
};

export default NoDailyMenu;
