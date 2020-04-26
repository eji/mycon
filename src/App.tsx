import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { scheduleScreenPath, dailyMenuScreenPath } from "./routePaths";
import ScheduleScreen from "./views/screens/ScheduleScreen";
import DailyMenuScreen from "./views/screens/DailyMenuScreen";

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={scheduleScreenPath}>
        <ScheduleScreen />
      </Route>
      <Route exact path={dailyMenuScreenPath}>
        <DailyMenuScreen />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
