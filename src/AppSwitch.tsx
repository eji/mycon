import React from 'react';
import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import {
  scheduleScreenPath,
  editDailyMenuScreenPath,
  recipesScreenPath,
  addRecipeScreenPath,
  foodstuffsScreenPath,
  addFoodstuffScreenPath,
  familyMembersScreenPath,
  addFamilyMemberScreenPath,
  showDailyMenuScreenPath,
  addMealScreenPath,
  showFoodstuffScreenPath,
  showRecipeScreenPath,
} from './routePaths';
import ScheduleScreen from './views/screens/ScheduleScreen';
import DailyMenuScreen from './views/screens/DailyMenuScreen';
import RecipesScreen from './views/screens/RecipesScreen';
import EditRecipeScreen from './views/screens/EditRecipeScreen';
import FoodstuffsScreen from './views/screens/FoodstuffsScreen';
import EditFoodstuffScreen from './views/screens/EditFoodstuffScreen';
import FamilyMembersScreen from './views/screens/FamilyMembersScreen';
import EditFamilyMemberScreen from './views/screens/EditFamilyMemberScreen';
import RequireInitApp from './views/components/common/RequireInitApp';
import AddMealScreen from './views/screens/AddMealScreen';
import ShowFoodstuffScreen from './views/screens/ShowFoodstuffScreen';
import ShowRecipeScreen from './views/screens/ShowRecipeScreen';
import { isLocationState } from './locationState';

const AppSwitch: React.FC = () => {
  const location = useLocation();

  const background =
    location.state &&
    isLocationState(location.state) &&
    location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route exact path={scheduleScreenPath()}>
          <RequireInitApp>
            <ScheduleScreen />
          </RequireInitApp>
        </Route>
        <Route exact path={showDailyMenuScreenPath()}>
          <RequireInitApp>
            <DailyMenuScreen />
          </RequireInitApp>
        </Route>
        <Route exact path={editDailyMenuScreenPath()}>
          <RequireInitApp>
            <DailyMenuScreen />
          </RequireInitApp>
        </Route>
        <Route path={addMealScreenPath()}>
          <RequireInitApp>
            <AddMealScreen />
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
        <Route exact path={showRecipeScreenPath()}>
          <RequireInitApp>
            <ShowRecipeScreen />
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
        <Route exact path={showFoodstuffScreenPath()}>
          <RequireInitApp>
            <ShowFoodstuffScreen />
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
    </>
  );
};

export default AppSwitch;
