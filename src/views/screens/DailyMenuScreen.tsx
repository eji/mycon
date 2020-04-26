import React, { ReactNode } from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Layout from "../layouts/Layout";
import DailyMenu from "../components/Menu/DailyMenu";

type TabPanelProps = {
  index: number;
  selectedIndex: number;
  children: ReactNode;
};

const TabPanel: React.FC<TabPanelProps> = (props: TabPanelProps) => {
  const { index, selectedIndex, children } = props;
  return (
    <Box
      role="tabpanel"
      hidden={index !== selectedIndex}
      id={`menu-tabpanel-${index}`}
      aria-labelledby={`menu-tab-${index}`}
    >
      {children}
    </Box>
  );
};

// function a11yProps(index: any) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

type DailyMenuScreenProps = {};

const DailyMenuScreen: React.FC<DailyMenuScreenProps> = () => {
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: number
  ): void => {
    setValue(newValue);
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
      <TabPanel selectedIndex={value} index={0}>
        <DailyMenu />
      </TabPanel>
      <TabPanel selectedIndex={value} index={1}>
        <DailyMenu />
      </TabPanel>
    </Layout>
  );
};

export default DailyMenuScreen;
