import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import {
  SidebarRenderLinksDiscovery,
  SidebarRenderLinksGenre,
} from "../containers/SidebarItems";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function TemporaryDrawer({
  isOpen,
  setIsOpen,
  genre,
  openSidebarHandler,
}) {
  const classes = useStyles();
  let modifiedGenre;
  if (genre) {
    modifiedGenre = {
      ...genre,
      genres: [...genre.genres],
    };
  }
  const list = () => (
    <div className={clsx(classes.list)}>
      <List>
        <h2 style={{ textAlign: "center" }}>DISCOVER</h2>
        {genre && (
          <SidebarRenderLinksDiscovery
            openSidebarHandler={openSidebarHandler}
          />
        )}
      </List>
      <Divider />
      <List>
        <h2 style={{ textAlign: "center" }}>GENRE</h2>
        {genre &&
          genre.genres.map((genre) => (
            <SidebarRenderLinksGenre
              genre={genre}
              key={genre.id}
              openSidebarHandler={genre.openSidebarHandler}
            />
          ))}
      </List>
    </div>
  );
  console.log(   "mod");

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer anchor={anchor} open={isOpen} onClose={openSidebarHandler}>
            {list()}
          </Drawer>
          {console.log(genre, "GENRE")}
        </React.Fragment>
      ))}
    </div>
  );
}
