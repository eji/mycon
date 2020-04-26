import React from "react";
import {
  createStyles,
  makeStyles,
  Box,
  Grid,
  ButtonBase,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import { useHistory } from "react-router-dom";
import { dailyMenuScreenPath } from "../../../routePaths";

const useStyle = makeStyles(() =>
  createStyles({
    root: {
      padding: 0,
      height: 90,
      width: "100%",
    },
    day: {
      textAlign: "center",
      width: "100%",
      fontSize: 18,
    },
    statusDone: {
      color: "#00CC00",
      width: "100%",
    },
  })
);

type MonthlyScheduleTableDayColumnProps = {
  dayInfoList: {
    date: Date;
    dayOfTheWeek: string;
  }[];
  dayOfTheWeek: string;
};

const MonthlyScheduleTableDayColumn: React.FC<MonthlyScheduleTableDayColumnProps> = (
  props: MonthlyScheduleTableDayColumnProps
) => {
  const history = useHistory();
  const classes = useStyle();
  const { dayInfoList, dayOfTheWeek } = props;

  const dayInfo = dayInfoList.find(
    (info) => info.dayOfTheWeek === dayOfTheWeek
  );

  if (dayInfo == null) {
    return <></>;
  }

  const handleClieck = (): void => {
    history.push(dailyMenuScreenPath);
  };

  return (
    <ButtonBase className={classes.root} onClick={handleClieck}>
      <Grid
        container
        item
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Box className={classes.day}>{dayInfo.date.getDate()}</Box>
        <Box className={classes.statusDone}>
          <DoneIcon />
        </Box>
      </Grid>
    </ButtonBase>
  );
};

export default MonthlyScheduleTableDayColumn;
