import React, { ReactNode } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

type LayoutProps = {
  title: string;
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { title, children } = props;
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default Layout;
