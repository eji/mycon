import React, { useContext, ReactNode } from 'react';
import {
  createMuiTheme,
  useTheme,
  ThemeProvider,
  useMediaQuery,
} from '@material-ui/core';
import { appStateContext } from '../AppStateProvider';
import { changeDarkMode } from '../../state/appState';

type Props = {
  children: ReactNode;
};

const AppTheme: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const { appState, dispatch } = useContext(appStateContext);
  const { darkMode } = appState;
  const theme = useTheme();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  if (darkMode == null) {
    dispatch(changeDarkMode(prefersDarkMode));
  }

  const appTheme = React.useMemo(() => {
    const isDarkMode = darkMode == null ? prefersDarkMode : darkMode;
    return createMuiTheme({
      ...theme,
      palette: {
        type: isDarkMode ? 'dark' : 'light',
        primary: theme.palette.primary,
        secondary: theme.palette.secondary,
      },
    });
  }, [darkMode, prefersDarkMode]);
  return <ThemeProvider theme={appTheme}>{children}</ThemeProvider>;
};

export default AppTheme;
