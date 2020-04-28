import React, { ReactNode, useReducer } from "react";
import { createAppStateContext } from "../appStore";
import { appStateReducer, initAppState } from "../state/appState";

export const appStateContext = createAppStateContext();

interface AppStateProviderProps {
  children: ReactNode;
}

const AppStateProvider: React.FC<AppStateProviderProps> = (
  props: AppStateProviderProps
) => {
  const { children } = props;
  const [appState, dispatch] = useReducer(appStateReducer, initAppState);
  return (
    <appStateContext.Provider value={{ appState, dispatch }}>
      {children}
    </appStateContext.Provider>
  );
};

export default AppStateProvider;
