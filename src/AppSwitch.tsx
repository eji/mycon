import React from 'react';
import './App.css';
import { Switch, Route, useLocation } from 'react-router-dom';
import {
  scheduleScreenPath,
  recipesScreenPath,
  addRecipeScreenPath,
  foodstuffsScreenPath,
  addFoodstuffScreenPath,
  familyMembersScreenPath,
  addFamilyMemberScreenPath,
  showFoodstuffScreenPath,
  showRecipeScreenPath,
  editDailyMealScreenPath,
  showDailyMealScreenPath,
  addRecipeToDailyMenuDialogPath,
} from './routePaths';
import ScheduleScreen from './views/screens/ScheduleScreen';
import RecipesScreen from './views/screens/RecipesScreen';
import EditRecipeScreen from './views/screens/EditRecipeScreen';
import FoodstuffsScreen from './views/screens/FoodstuffsScreen';
import EditFoodstuffScreen from './views/screens/EditFoodstuffScreen';
import FamilyMembersScreen from './views/screens/FamilyMembersScreen';
import EditFamilyMemberScreen from './views/screens/EditFamilyMemberScreen';
import RequireInitApp from './views/components/common/RequireInitApp';
import ShowFoodstuffScreen from './views/screens/ShowFoodstuffScreen';
import ShowRecipeScreen from './views/screens/ShowRecipeScreen';
import { isLocationState } from './locationState';
import DailyMealScreen from './views/screens/DailyMealScreen';
import SelectRecipesDialog from './views/components/Meal/SelectRecipesDialog';

const AppSwitch: React.FC = () => {
  const location = useLocation();

  const background =
    location.state &&
    isLocationState(location.state) &&
    location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <RequireInitApp>
          <Route exact path={scheduleScreenPath()}>
            <ScheduleScreen />
          </Route>
          <Route exact path={showDailyMealScreenPath()}>
            <DailyMealScreen />
          </Route>
          <Route exact path={editDailyMealScreenPath()}>
            <DailyMealScreen />
          </Route>
          <Route exact path={recipesScreenPath()}>
            <RecipesScreen />
          </Route>
          <Route exact path={addRecipeScreenPath()}>
            <EditRecipeScreen />
          </Route>
          <Route exact path={showRecipeScreenPath()}>
            <ShowRecipeScreen />
          </Route>
          <Route exact path={foodstuffsScreenPath()}>
            <FoodstuffsScreen />
          </Route>
          <Route exact path={addFoodstuffScreenPath()}>
            <EditFoodstuffScreen />
          </Route>
          <Route exact path={showFoodstuffScreenPath()}>
            <ShowFoodstuffScreen />
          </Route>
          <Route exact path={familyMembersScreenPath()}>
            <FamilyMembersScreen />
          </Route>
          <Route path={addFamilyMemberScreenPath()}>
            <EditFamilyMemberScreen />
          </Route>
        </RequireInitApp>
      </Switch>

      {background && (
        <Switch location={location}>
          <Route path={addRecipeToDailyMenuDialogPath()}>
            <SelectRecipesDialog />
          </Route>
        </Switch>
      )}
    </>
  );
};

export default AppSwitch;
