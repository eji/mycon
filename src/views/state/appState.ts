import RecipesOfTheDay from "../../domain/models/recipesOfTheDay";
import Recipe from "../../domain/models/recipe";

export type AppState = {
  /**
   * 一日の献立一覧
   */
  recpiesOfTheDays: RecipesOfTheDay[];

  /**
   * 一日の献立
   */
  recipesOfTheDay?: RecipesOfTheDay;
};

/* action messages */

/* actions */

export type AppStateAction = DomainAction;

/* action handlers */

/* reducer */

export const appStateReducer: Reducer<AppState, AppStateAction> = (
  state,
  action
) => {
  if (isDomainAction(action)) {
    return { ...state, domain: domainReducer(state.domain, action) };
  }
  return state;
};

/* initial state */

export const initAppState: AppState = {
  domain: initAppData,
};
