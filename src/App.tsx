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
import EditRecipeScreen from './views/screens/EditRecipeScreen';
import FoodstuffsScreen from './views/screens/FoodstuffsScreen';
import EditFoodstuffScreen from './views/screens/EditFoodstuffScreen';
import FamilyMembersScreen from './views/screens/FamilyMembersScreen';
import EditFamilyMemberScreen from './views/screens/EditFamilyMemberScreen';
import RequireInitApp from './views/components/common/RequireInitApp';

const App: React.FC = () => (
  <>
    <CssBaseline />
    <AppStateProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path={scheduleScreenPath}>
            <RequireInitApp>
              <ScheduleScreen />
            </RequireInitApp>
          </Route>
          <Route exact path={dailyMenuScreenPath}>
            <RequireInitApp>
              <DailyMenuScreen />
            </RequireInitApp>
          </Route>
          <Route exact path={editDailyMenuScreenPath}>
            <RequireInitApp>
              <DailyMenuScreen />
            </RequireInitApp>
          </Route>
          <Route exact path={recipesScreenPath()}>
            <RequireInitApp>
              <RecipesScreen />
            </RequireInitApp>
          </Route>
          <Route exact path={addRecipeScreenPath()}>
            <RequireInitApp>
              <EditRecipeScreen />
            </RequireInitApp>
          </Route>
          <Route exact path={foodstuffsScreenPath()}>
            <RequireInitApp>
              <FoodstuffsScreen />
            </RequireInitApp>
          </Route>
          <Route exact path={addFoodstuffScreenPath()}>
            <RequireInitApp>
              <EditFoodstuffScreen />
            </RequireInitApp>
          </Route>
          <Route exact path={familyMembersScreenPath()}>
            <RequireInitApp>
              <FamilyMembersScreen />
            </RequireInitApp>
          </Route>
          <Route path={addFamilyMemberScreenPath()}>
            <RequireInitApp>
              <EditFamilyMemberScreen />
            </RequireInitApp>
          </Route>
        </Switch>
      </BrowserRouter>
    </AppStateProvider>
  </>
);

export default App;
