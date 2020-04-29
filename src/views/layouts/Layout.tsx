import React, { ReactNode, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Box,
  createStyles,
  Theme,
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import EventIcon from '@material-ui/icons/Event';
import { useHistory } from 'react-router-dom';
import AppleIcon from '@material-ui/icons/Apple';
import { scheduleScreenPath, recipesScreenPath } from '../../routePaths';
import { appStateContext } from '../components/AppStateProvider';
import { selectBottomNavi } from '../state/appState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
    backButton: {
      marginRight: theme.spacing(2),
    },
    appBar: {
      flex: 'none',
    },
    contentArea: {
      flex: 'auto',
      overflowY: 'scroll',
    },
    bottomNavi: {
      flex: 'none',
      width: '100vw',
    },
  })
);

type LayoutProps = {
  title: string;
  handleBack?: () => void;
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { title, handleBack, children } = props;
  const history = useHistory();
  const classes = useStyles();
  const { appState, dispatch } = useContext(appStateContext);
  const { bottomNaviIndex } = appState;

  const handleClickSchedule = (): void => {
    history.replace(scheduleScreenPath);
  };

  const handleClickMenu = (): void => {
    // history.replace(menuScreenPath);
  };

  const handleClickRecipes = (): void => {
    history.replace(recipesScreenPath);
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {handleBack && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              className={classes.backButton}
              onClick={handleBack}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.contentArea}>{children}</Box>
      <BottomNavigation
        value={bottomNaviIndex}
        onChange={async (event, newValue): Promise<void> => {
          await selectBottomNavi(dispatch, newValue);
        }}
        showLabels
        className={classes.bottomNavi}
      >
        <BottomNavigationAction
          label="スケジュール"
          icon={<EventIcon />}
          onClick={handleClickSchedule}
        />
        <BottomNavigationAction
          label="レシピ"
          icon={<RestaurantIcon />}
          onClick={handleClickRecipes}
        />
        <BottomNavigationAction
          label="食材"
          icon={<AppleIcon />}
          onClick={handleClickMenu}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Layout;
