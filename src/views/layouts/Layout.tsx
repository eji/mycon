import React, { ReactNode, useContext, useCallback } from 'react';
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
import GroupIcon from '@material-ui/icons/Group';
import {
  scheduleScreenPath,
  recipesScreenPath,
  foodstuffsScreenPath,
  familyMembersScreenPath,
} from '../../routePaths';
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
  hideBottomNavi?: boolean;
};

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { title, handleBack, hideBottomNavi, children } = props;
  const history = useHistory();
  const classes = useStyles();
  const { appState, dispatch } = useContext(appStateContext);
  const { bottomNaviIndex } = appState;

  const goTo = useCallback(
    (path: string): (() => void) => (): void => history.replace(path),
    [history]
  );

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
      {hideBottomNavi || (
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
            onClick={goTo(scheduleScreenPath())}
          />
          <BottomNavigationAction
            label="レシピ"
            icon={<RestaurantIcon />}
            onClick={goTo(recipesScreenPath())}
          />
          <BottomNavigationAction
            label="食材"
            icon={<AppleIcon />}
            onClick={goTo(foodstuffsScreenPath())}
          />
          <BottomNavigationAction
            label="家族"
            icon={<GroupIcon />}
            onClick={goTo(familyMembersScreenPath())}
          />
        </BottomNavigation>
      )}
    </Box>
  );
};

export default Layout;
