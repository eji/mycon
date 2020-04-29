import React, { ReactNode } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Box,
  createStyles,
  Theme,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    },
    backButton: {
      marginRight: theme.spacing(2),
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
  })
);

type LayoutProps = {
  title: string;
  handleBack?: () => void;
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { title, handleBack, children } = props;
  // const history = useHistory();
  const classes = useStyles();

  // const handleClickSchedule = (): void => {
  //   history.replace(scheduleScreenPath);
  // };

  // const handleClickMenu = (): void => {
  //   // history.replace(menuScreenPath);
  // };

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
      {/* <BottomNavigation
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
      </BottomNavigation> */}
    </Box>
  );
};

export default Layout;
