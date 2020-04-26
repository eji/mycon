import React from "react";
import { createStyles, makeStyles, Box, Grid } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import { useHistory } from "react-router-dom";
import { menuScreenPath } from "../../../routePaths";

const useStyle = makeStyles(() =>
  createStyles({
    root: {
      padding: 0,
      height: 90,
    },
    day: {
      textAlign: "center",
      width: 20,
    },
    statusDone: {
      color: "#00CC00",
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
    history.push(menuScreenPath);
  };

  return (
    <Box className={classes.root} onClick={handleClieck}>
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
    </Box>
  );
};

export default MonthlyScheduleTableDayColumn;
