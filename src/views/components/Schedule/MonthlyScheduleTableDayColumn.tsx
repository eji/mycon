import React from "react";
import { createStyles, makeStyles, Theme, Box, Grid } from "@material-ui/core";

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0,
      height: 90,
    },
    day: {
      textAlign: "center",
      width: 20,
    },
    statusList: {
      listStyleType: "none",
      width: "100%",
      padding: 0,
    },
    statusListItem: {
      color: "white",
      backgroundColor: "#3399FF",
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
  const classes = useStyle();
  const { dayInfoList, dayOfTheWeek } = props;

  const dayInfo = dayInfoList.find(
    (info) => info.dayOfTheWeek === dayOfTheWeek
  );
  if (dayInfo == null) {
    return <></>;
  }

  return (
    <Grid
      container
      item
      direction="column"
      justify="flex-start"
      alignItems="flex-start"
      className={classes.root}
    >
      <Box className={classes.day}>{dayInfo.date.getDate()}</Box>
      <ul className={classes.statusList}>
        <li className={classes.statusListItem}>食べた</li>
        <li className={classes.statusListItem}>登録済み</li>
      </ul>
    </Grid>
  );
};

export default MonthlyScheduleTableDayColumn;
