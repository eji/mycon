import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  scheduleScreenPath,
  dailyMenuScreenPath,
  editDailyMenuScreenPath,
  recipesScreenPath,
  addRecipeScreenPath,
  foodstuffsScreenPath,
} from './routePaths';
import ScheduleScreen from './views/screens/ScheduleScreen';
import DailyMenuScreen from './views/screens/DailyMenuScreen';
import AppStateProvider from './views/components/AppStateProvider';
import RecipesScreen from './views/screens/RecipesScreen';
import AddRecipeScreen from './views/screens/AddRecipeScreen';
import FoodstuffsScreen from './views/screens/FoodstuffsScreen';

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
        <Route exact path={recipesScreenPath}>
          <RecipesScreen />
        </Route>
        <Route exact path={addRecipeScreenPath}>
          <AddRecipeScreen />
        </Route>
        <Route exact path={foodstuffsScreenPath}>
          <FoodstuffsScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  </AppStateProvider>
);

export default App;
