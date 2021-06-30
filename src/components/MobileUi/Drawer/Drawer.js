import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";

import { TmdbLogo } from "../../IconsAsComponent/IconsAsComponent";
import {
  SidebarItemDiscovery,
  SidebarItemGenre,
} from "../../Sidebar/SidebarItems/SidebarItems";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const TemporaryDrawer = ({ genre, openSidebarHandler, isOpen }) => {
  const classes = useStyles();

  const list = () => (
    <div className={clsx(classes.list)}>
      <List>
        <h2 style={{ textAlign: "center" }}>DISCOVER</h2>
        {genre && (
          <SidebarItemDiscovery openSidebarHandler={openSidebarHandler} />
        )}
      </List>
      <Divider />
      <List>
        <h2 style={{ textAlign: "center" }}>GENRE</h2>
        {genre &&
          genre.genres.map((genre) => (
            <SidebarItemGenre
              genre={genre}
              key={genre.id}
              openSidebarHandler={openSidebarHandler}
            />
          ))}
      </List>
      <TmdbLogo />
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer anchor={anchor} open={isOpen} onClose={openSidebarHandler}>
            {list()}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default TemporaryDrawer;