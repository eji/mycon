import React, { ReactNode, useContext } from 'react';
import {
  Tabs,
  Tab,
  Box,
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import Layout from '../layouts/Layout';
import DailyMealView from '../components/DailyMeal/DailyMealView';
import { appStateContext } from '../components/AppStateProvider';
import { scheduleScreenPath } from '../../routePaths';
import { calendarDateFromDailyMealID } from '../../domain/models/dailyMeal';
import NoDailyMeal from '../components/DailyMeal/NoDailyMeal';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    tabContent: {
      height: '100%',
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

type Props = {};

const DailyMealScreen: React.FC<Props> = () => {
  const { id } = useParams();
  const { appState } = useContext(appStateContext);
  const history = useHistory();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  // const classes = useStyles();

  if (id == null) {
    history.replace(scheduleScreenPath());
    return <></>;
  }

  const calendarDate = calendarDateFromDailyMealID(id);
  if (calendarDate == null) {
    history.replace(scheduleScreenPath());
    return <></>;
  }

  const title = `${calendarDate.year}年${calendarDate.month}月${calendarDate.day}日(${calendarDate.dayOfTheWeek})`;

  const dailyMeal = appState.allDailyMeals[id];

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

  if (dailyMeal == null) {
    return (
      <Layout title={title} handleBack={handleBack}>
        <NoDailyMeal calendarDate={calendarDate} />
      </Layout>
    );
  }

  return (
    <Layout title={title} handleBack={handleBack}>
      <DailyMealView dailyMeal={dailyMeal} />
    </Layout>
  );
};

export default DailyMealScreen;
