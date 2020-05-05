import { Reducer } from 'react';
import * as TE from 'fp-ts/lib/TaskEither';
import { pipe } from 'fp-ts/lib/pipeable';
import { container } from 'tsyringe';
import Calendar, { makeCalendar } from '../../domain/models/calendar';
import {
  CalendarAction,
  isCalendarAction,
  calendarReducer,
} from './appState/calendar';
import DailyMenu from '../../domain/models/dailyMenu';
import Recipe from '../../domain/models/recipe';
import { Action } from '../../types/action';
import { ActionHandler } from '../../types/actionHandler';
import {
  AllFoodStuffs,
  isAllFoodstuffsAction,
  allFoodstuffsReducer,
  AllFoodstuffsAction,
} from './appState/allFoodstuffs';
import {
  AllRecipesAction,
  isAllRecipesAction,
  allRecipesReducer,
} from './appState/allRecipes';
import FoodAllergyHistory from '../../domain/models/foodAllergyHistory';
import FamilyMember from '../../domain/models/familyMember';
import {
  AllFamilyMembersAction,
  isAllFamilyMembersAction,
  allFamilyMembersReducer,
} from './appState/allFamilyMembers';
import {
  isAllFoodAllergyHistoriesAction,
  allFoodAllergyHistoriesReducer,
} from './appState/allFoodAllergyHistories';
import RepositoryError from '../../errors/repositoryError';
import initSeeds from '../../data/initSeeds';
import {
  foodstuffRepository,
  familyMemberRepository,
  recipeRepository,
} from '../../types/diTypes';
import FoodstuffRepository from '../../domain/repositories/foodstuffRepository';
import FamilyMemberRepository from '../../domain/repositories/familyMemberRepository';
import RecipeRepository from '../../domain/repositories/recipeRepository';

export type InitializedAppState = 'not yet' | 'initializing' | 'initialized';

export type AppState = {
  /* ドメインモデル */

  /**
   * カレンダー
   */
  calendar: Calendar;

  /**
   * 全ての献立
   */
  allDailyMenus: { [key: string]: DailyMenu };

  /**
   * 全てのレシピ
   */
  allRecipes: { [key: string]: Recipe };

  /**
   * 全ての食材
   */
  allFoodstuffs: AllFoodStuffs;

  /**
   * 全ての家族メンバー
   */
  allFamilyMembers: { [key: string]: FamilyMember };

  /**
   * 全ての食品アレルギー履歴
   */
  allFoodAllergyHistories: {
    byFamilyMember: { [key: string]: FoodAllergyHistory };
    byFoodstuff: { [key: string]: FoodAllergyHistory };
  };

  /* アプリのステート */

  initializeAppState: InitializedAppState;

  /* UIのステート */

  bottomNaviIndex: number;
};

/* action messages */
const selectBottomNaviMsg = 'selectBottomNavi';
const initializeAppStateMsg = 'initializeAppState';

/* actions */

type SelectBottomNaviAction = Action<
  typeof selectBottomNaviMsg,
  { index: number }
>;

type InitializeAppStateAction = Action<
  typeof initializeAppStateMsg,
  { status: InitializedAppState; newAppState?: AppState }
>;

export type AppStateAction =
  | SelectBottomNaviAction
  | InitializeAppStateAction
  | CalendarAction
  | AllRecipesAction
  | AllFoodstuffsAction
  | AllFamilyMembersAction
  | AllFoodstuffsAction;

/* action handlers */

const selectBottomNaviHandler: ActionHandler<
  AppState,
  SelectBottomNaviAction
> = (appState, { index }) => {
  return { ...appState, bottomNaviIndex: index };
};

const initializeAppStateHandler: ActionHandler<
  AppState,
  InitializeAppStateAction
> = (appState, { status, newAppState }) => {
  if (typeof newAppState === 'undefined') {
    return appState;
  }
  return { ...appState, ...newAppState, initializeAppState: status };
};

/* reducer */

export const appStateReducer: Reducer<AppState, AppStateAction> = (
  state,
  action
) => {
  const newState = {
    ...state,
    calendar: isCalendarAction(action)
      ? calendarReducer(state.calendar, action)
      : state.calendar,
    allFoodstuffs: isAllFoodstuffsAction(action)
      ? allFoodstuffsReducer(state.allFoodstuffs, action)
      : state.allFoodstuffs,
    allRecipes: isAllRecipesAction(action)
      ? allRecipesReducer(state.allRecipes, action)
      : state.allRecipes,
    allFamilyMembers: isAllFamilyMembersAction(action)
      ? allFamilyMembersReducer(state.allFamilyMembers, action)
      : state.allFamilyMembers,
    allFoodAllergyHistories: isAllFoodAllergyHistoriesAction(action)
      ? allFoodAllergyHistoriesReducer(state.allFoodAllergyHistories, action)
      : state.allFoodAllergyHistories,
  };
  switch (action.type) {
    case selectBottomNaviMsg:
      return selectBottomNaviHandler(newState, action);
    case initializeAppStateMsg:
      return initializeAppStateHandler(newState, action);
    default:
      return newState;
  }
};

/* initial state */

export const initAppState: AppState = {
  calendar: makeCalendar(),
  allDailyMenus: {},
  allRecipes: {},
  allFoodstuffs: {},
  allFamilyMembers: {},
  allFoodAllergyHistories: {
    byFamilyMember: {},
    byFoodstuff: {},
  },
  initializeAppState: 'not yet',
  bottomNaviIndex: 0,
};

/* action creator */

export const selectBottomNavi = async (
  dispatch: React.Dispatch<AppStateAction>,
  index: number
): Promise<void> => {
  dispatch({ type: selectBottomNaviMsg, index });
  return Promise.resolve();
};

// TODO: 直すこと
export const initializingAppState = (): TE.TaskEither<
  RepositoryError,
  InitializeAppStateAction
> => {
  const recipeRepos = container.resolve<RecipeRepository>(recipeRepository);
  const foodstuffRepos = container.resolve<FoodstuffRepository>(
    foodstuffRepository
  );
  const familyMemberRepos = container.resolve<FamilyMemberRepository>(
    familyMemberRepository
  );
  return pipe(
    initSeeds(),
    TE.chain(() =>
      pipe(
        recipeRepos.all(),
        TE.chain((allRecipes) =>
          pipe(
            familyMemberRepos.all(),
            TE.chain((allFamilyMembers) =>
              pipe(
                foodstuffRepos.all(),
                TE.map(
                  (allFoodstuffs): InitializeAppStateAction => {
                    const newAppState: AppState = {
                      calendar: makeCalendar(),
                      allDailyMenus: {},
                      allRecipes: allRecipes.reduce(
                        (acc, recipe) => ({
                          ...acc,
                          [recipe.id]: recipe,
                        }),
                        {}
                      ),
                      allFoodstuffs: allFoodstuffs.reduce(
                        (acc, foodstuff) => ({
                          ...acc,
                          [foodstuff.id]: foodstuff,
                        }),
                        {} as AllFoodStuffs
                      ),
                      allFamilyMembers: allFamilyMembers.reduce(
                        (acc, familyMember) => ({
                          ...acc,
                          [familyMember.id]: familyMember,
                        }),
                        {}
                      ),
                      allFoodAllergyHistories: {
                        byFamilyMember: {},
                        byFoodstuff: {},
                      },
                      initializeAppState: 'initialized',
                      bottomNaviIndex: 0,
                    };
                    return {
                      type: initializeAppStateMsg,
                      newAppState,
                      status: 'initialized',
                    };
                  }
                )
              )
            )
          )
        )
      )
    )
  );
};
