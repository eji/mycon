import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import {
  scheduleScreenPath,
  dailyMenuScreenPath,
  editDailyMenuScreenPath,
  recipesScreenPath,
  addRecipeScreenPath,
  foodstuffsScreenPath,
  addFoodstuffScreenPath,
  familyMembersScreenPath,
  addFamilyMemberScreenPath,
} from './routePaths';
import ScheduleScreen from './views/screens/ScheduleScreen';
import DailyMenuScreen from './views/screens/DailyMenuScreen';
import AppStateProvider from './views/components/AppStateProvider';
import RecipesScreen from './views/screens/RecipesScreen';
import AddRecipeScreen from './views/screens/AddRecipeScreen';
import FoodstuffsScreen from './views/screens/FoodstuffsScreen';
import AddFoodstuffScreen from './views/screens/AddFoodstuffScreen';
import FamilyMembersScreen from './views/screens/FamilyMembersScreen';
import EditFamilyMemberScreen from './views/screens/EditFamilyMemberScreen';

const App: React.FC = () => (
  <>
    <CssBaseline />
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
          <Route exact path={recipesScreenPath()}>
            <RecipesScreen />
          </Route>
          <Route exact path={addRecipeScreenPath()}>
            <AddRecipeScreen />
          </Route>
          <Route exact path={foodstuffsScreenPath()}>
            <FoodstuffsScreen />
          </Route>
          <Route exact path={addFoodstuffScreenPath()}>
            <AddFoodstuffScreen />
          </Route>
          <Route exact path={familyMembersScreenPath()}>
            <FamilyMembersScreen />
          </Route>
          <Route path={addFamilyMemberScreenPath()}>
            <EditFamilyMemberScreen />
          </Route>
        </Switch>
      </BrowserRouter>
    </AppStateProvider>
  </>
);

export default App;
