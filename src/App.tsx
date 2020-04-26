import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MenuScreen from "./views/screens/MenuScreen";
import ScheduleScreen from "./views/screens/ScheduleScreen";
import { menuScreenPath, scheduleScreenPath } from "./routePaths";

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={menuScreenPath}>
        <MenuScreen />
      </Route>
      <Route exact path={scheduleScreenPath}>
        <ScheduleScreen />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
