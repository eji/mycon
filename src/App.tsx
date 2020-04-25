import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MenuScreen from "./views/screens/MenuScreen";

const App: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <MenuScreen />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
