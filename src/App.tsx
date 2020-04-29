import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
  scheduleScreenPath,
  dailyMenuScreenPath,
  editDailyMenuScreenPath,
} from "./routePaths";
import ScheduleScreen from "./views/screens/ScheduleScreen";
import DailyMenuScreen from "./views/screens/DailyMenuScreen";
import AppStateProvider from "./views/components/AppStateProvider";

const App: React.FC = () => (
  <AppStateProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path={scheduleScreenPath}>
          <ScheduleScreen />
        </Route>
        <Route exact path={dailyMenuScreenPath}>
          <DailyMenuScreen />
        </Route>
        <Route exact path={editDailyMenuScreenPath}>
          <DailyMenuScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  </AppStateProvider>
);

export default App;
