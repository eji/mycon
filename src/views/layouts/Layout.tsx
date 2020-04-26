import React, { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import EventIcon from "@material-ui/icons/Event";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { useHistory } from "react-router-dom";
import { scheduleScreenPath, menuScreenPath } from "../../routePaths";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  appBar: {
    flex: "none",
  },
  contentArea: {
    flex: "auto",
    overflowY: "scroll",
  },
  bottomNavi: {
    flex: "none",
    width: "100vw",
  },
});

type LayoutProps = {
  title: string;
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { title, children } = props;
  const history = useHistory();
  const classes = useStyles();

  const handleClickSchedule = (): void => {
    history.replace(scheduleScreenPath);
  };
  const handleClickMenu = (): void => {
    history.replace(menuScreenPath);
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.contentArea}>{children}</Box>
      <BottomNavigation
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(newValue);
        // }}
        showLabels
        className={classes.bottomNavi}
      >
        <BottomNavigationAction
          label="スケジュール"
          icon={<EventIcon />}
          onClick={handleClickSchedule}
        />
        <BottomNavigationAction
          label="メニュー"
          icon={<MenuBookIcon />}
          onClick={handleClickMenu}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Layout;
