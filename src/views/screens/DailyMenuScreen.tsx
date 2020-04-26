import React, { ReactNode } from "react";
import {
  Tabs,
  Tab,
  Box,
  useTheme,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import Layout from "../layouts/Layout";
import DailyMenu from "../components/Menu/DailyMenu";

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
  const history = useHistory();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const classes = useStyles();

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
    <Layout title="2020年4月30日(水)" handleBack={handleBack}>
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
