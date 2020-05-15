import React, { useContext, ReactNode } from 'react';
import { createMuiTheme, useTheme, ThemeProvider } from '@material-ui/core';
import { appStateContext } from '../AppStateProvider';

type Props = {
  children: ReactNode;
};

const AppTheme: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { appState } = useContext(appStateContext);
  const { darkMode } = appState;
  const theme = useTheme();
  const appTheme = React.useMemo(() => {
    return createMuiTheme({
      ...theme,
      palette: {
        type: darkMode ? 'dark' : 'light',
        primary: theme.palette.primary,
        secondary: theme.palette.secondary,
      },
    });
  }, [darkMode]);
  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
};

export default AppTheme;
