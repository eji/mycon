import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Box,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@material-ui/core";
import * as R from "remeda";
import splitAllWhen from "../../../utils/splitAllWhen";
import MonthlyScheduleTableDayColumn from "./MonthlyScheduleTableDayColumn";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    weekdays: {
      width: "100vw",
      backgroundColor: "#ddd",
    },
    weekdaysSaturday: {
      color: "blue",
    },
    weekdaysSunday: {
      color: "red",
    },
  })
);

const dayOfTheWeeks = ["月", "火", "水", "木", "金", "土", "日"];

const dayOfTheWeekTable = new Map([
  [0, "日"],
  [1, "月"],
  [2, "火"],
  [3, "水"],
  [4, "木"],
  [5, "金"],
  [6, "土"],
]);

type MonthlyScheduleTableProps = {};

const MonthlyScheduleTable: React.FC<MonthlyScheduleTableProps> = () => {
  const classes = useStyles();

  const rows = splitAllWhen(
    R.range(1, 31).map((index) => {
      const date = new Date(`2020-04-${index}`);
      const dayOfTheWeek = dayOfTheWeekTable.get(date.getDay()) || "日";
      return {
        date,
        dayOfTheWeek,
      };
    }),
    (item) => item.dayOfTheWeek === "月"
  );

  return (
    <Box className={classes.root}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {dayOfTheWeeks.map((dayOfTheWeek) => (
              <TableCell>{dayOfTheWeek}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((days) => (
            <TableRow>
              {dayOfTheWeeks.map((dayOfTheWeek) => (
                <TableCell component="th" scope="row" padding="none">
                  <MonthlyScheduleTableDayColumn
                    dayOfTheWeek={dayOfTheWeek}
                    dayInfoList={days}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default MonthlyScheduleTable;
