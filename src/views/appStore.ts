import { createContext } from "react";
import { AppState, AppStateAction, initAppState } from "./state/appState";

export default interface AppStore {
  appState: AppState;
  dispatch: React.Dispatch<AppStateAction>;
}

export const initAppStore: AppStore = {
  appState: initAppState,
  dispatch: (): void => {},
};

export function createAppStateContext(
  initStore: AppStore = initAppStore
): React.Context<AppStore> {
  return createContext<AppStore>(initStore);
}
