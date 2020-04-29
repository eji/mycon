import React, { ReactNode, useContext } from "react";
import {
  Tabs,
  Tab,
  Box,
  useTheme,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import Layout from "../layouts/Layout";
import DailyMenu from "../components/DailyMenu/DailyMenu";
import { appStateContext } from "../components/AppStateProvider";
import { scheduleScreenPath } from "../../routePaths";
import { calendarDateFromDailyMenuID } from "../../domain/models/dailyMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    tabContent: {
      height: "100%",
    },
  })
);

type TabPanelProps = {
  index: number;
  selectedIndex: number;
  children: ReactNode;
};

const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  const classes = useStyles();
  const { index, selectedIndex, children } = props;
  return (
    <Box
      role="tabpanel"
      hidden={index !== selectedIndex}
      id={`menu-tabpanel-${index}`}
      aria-labelledby={`menu-tab-${index}`}
      className={classes.tabContent}
    >
      {children}
    </Box>
  );
};

type DailyMenuScreenProps = {};

const DailyMenuScreen: React.FC<DailyMenuScreenProps> = () => {
  const { id } = useParams();
  const { appState } = useContext(appStateContext);
  const history = useHistory();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

  if (id == null) {
    history.replace(scheduleScreenPath);
    return <></>;
  }

  const calendarDate = calendarDateFromDailyMenuID(id);
  if (calendarDate == null) {
    history.replace(scheduleScreenPath);
    return <></>;
  }

  const title = `${calendarDate.year}年${calendarDate.month}月${calendarDate.day}日(${calendarDate.dayOfTheWeek})`;

  // const dailyMenu = appState.allDailyMenus[id];

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ): void => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number): void => {
    setValue(index);
  };

  const handleBack = (): void => history.goBack();

  return (
    <Layout title={title} handleBack={handleBack}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label="献立" id="menu-tab-0" aria-controls="menu-tabpanel-0" />
        <Tab label="栄養素" id="menu-tab-1" aria-controls="menu-tabpanel-1" />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents
      >
        <TabPanel selectedIndex={value} index={0}>
          <DailyMenu />
        </TabPanel>
        <TabPanel selectedIndex={value} index={1}>
          <DailyMenu />
        </TabPanel>
      </SwipeableViews>
    </Layout>
  );
};

export default DailyMenuScreen;
