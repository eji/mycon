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
  signInScreenPath,
} from './routePaths';
import ScheduleScreen from './views/screens/ScheduleScreen';
import RecipesScreen from './views/screens/RecipesScreen';
import EditRecipeScreen from './views/screens/EditRecipeScreen';
import FoodstuffsScreen from './views/screens/FoodstuffsScreen';
import EditFoodstuffScreen from './views/screens/EditFoodstuffScreen';
import FamilyMembersScreen from './views/screens/FamilyMembersScreen';
import EditFamilyMemberScreen from './views/screens/EditFamilyMemberScreen';
import ShowFoodstuffScreen from './views/screens/ShowFoodstuffScreen';
import ShowRecipeScreen from './views/screens/ShowRecipeScreen';
import { isLocationState } from './locationState';
import DailyMealScreen from './views/screens/DailyMealScreen';
import SelectRecipesDialog from './views/components/Meal/SelectRecipesDialog';
import NewSignInScreen from './views/screens/NewSignInScreen';
import AccessFilter from './views/components/common/AccessFilter';

const AppSwitch: React.FC = () => {
  const location = useLocation();

  const background =
    location.state &&
    isLocationState(location.state) &&
    location.state.background;

  return (
    <>
      <Switch location={background || location}>
        <Route exact path={signInScreenPath()}>
          <NewSignInScreen />
        </Route>
        <Route exact path={scheduleScreenPath()}>
          <AccessFilter requireSignIn>
            <ScheduleScreen />
          </AccessFilter>
        </Route>
        <Route exact path={showDailyMealScreenPath()}>
          <AccessFilter requireSignIn>
            <DailyMealScreen />
          </AccessFilter>
        </Route>
        <Route exact path={editDailyMealScreenPath()}>
          <AccessFilter requireSignIn>
            <DailyMealScreen />
          </AccessFilter>
        </Route>
        <Route exact path={recipesScreenPath()}>
          <AccessFilter requireSignIn>
            <RecipesScreen />
          </AccessFilter>
        </Route>
        <Route exact path={addRecipeScreenPath()}>
          <AccessFilter requireSignIn>
            <EditRecipeScreen />
          </AccessFilter>
        </Route>
        <Route exact path={showRecipeScreenPath()}>
          <AccessFilter requireSignIn>
            <ShowRecipeScreen />
          </AccessFilter>
        </Route>
        <Route exact path={foodstuffsScreenPath()}>
          <AccessFilter requireSignIn>
            <FoodstuffsScreen />
          </AccessFilter>
        </Route>
        <Route exact path={addFoodstuffScreenPath()}>
          <AccessFilter requireSignIn>
            <EditFoodstuffScreen />
          </AccessFilter>
        </Route>
        <Route exact path={showFoodstuffScreenPath()}>
          <AccessFilter requireSignIn>
            <ShowFoodstuffScreen />
          </AccessFilter>
        </Route>
        <Route exact path={familyMembersScreenPath()}>
          <AccessFilter requireSignIn>
            <FamilyMembersScreen />
          </AccessFilter>
        </Route>
        <Route path={addFamilyMemberScreenPath()}>
          <AccessFilter requireSignIn>
            <EditFamilyMemberScreen />
          </AccessFilter>
        </Route>
      </Switch>

      {background && (
        <Switch location={location}>
          <Route path={addRecipeToDailyMenuDialogPath()}>
            <AccessFilter requireSignIn>
              <SelectRecipesDialog />
            </AccessFilter>
          </Route>
        </Switch>
      )}
    </>
  );
};

export default AppSwitch;
