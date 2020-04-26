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
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
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
        <BottomNavigationAction label="スケジュール" icon={<EventIcon />} />
        <BottomNavigationAction label="メニュー" icon={<MenuBookIcon />} />
      </BottomNavigation>
    </Box>
  );
};

export default Layout;
