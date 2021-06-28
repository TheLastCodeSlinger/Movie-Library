import "./SidebarItems.css";

import { Fragment } from "react";
import { MdPlayArrow } from "react-icons/md";
import { NavLink } from "react-router-dom";

export const SidebarItemDiscovery = ({ openSidebarHandler }) => {
  return (
    <Fragment>
      <NavLink
        onClick={openSidebarHandler}
        className="sidebarItem"
        activeClassName="activeLinkStyle"
        to={{
          pathname: `/Discover/Popular`,
          state: { id: `popular` },
        }}
      >
        <div className="sidebarIcon">
          <MdPlayArrow />
        </div>
        <div className="sidebarGenreTag">Popular</div>
      </NavLink>
      <NavLink
        onClick={openSidebarHandler}
        className="sidebarItem"
        activeClassName="activeLinkStyle"
        to={{
          pathname: `/Discover/Top_Rated`,
          state: { id: `top_rated` },
        }}
      >
        <div className="sidebarIcon">
          <MdPlayArrow />
        </div>
        <div className="sidebarGenreTag">Top Rated</div>
      </NavLink>
      <NavLink
        onClick={openSidebarHandler}
        className="sidebarItem"
        activeClassName="activeLinkStyle"
        to={{
          pathname: `/Discover/Upcoming`,
          state: { id: `upcoming` },
        }}
      >
        <div className="sidebarIcon">
          <MdPlayArrow />
        </div>
        <div className="sidebarGenreTag">Upcoming</div>
      </NavLink>
    </Fragment>
  );
};

export const SidebarItemGenre = (genre) => {
  return (
    <NavLink
      onClick={genre.openSidebarHandler}
      className="sidebarItem"
      to={{
        //Save genre-id in state. Id can be globally accessed with "const location= useLocation & const {id} = location.?id"
        pathname: `/Genre/${genre.genre.name}`,
        state: {
          id: genre.genre.id,
        },
      }}
      key={genre.genre.id}
      activeClassName="activeLinkStyle"
    >
      <div className="sidebarIcon">
        <MdPlayArrow />
      </div>
      <div className="sidebarGenreTag">{genre.genre.name}</div>
    </NavLink>
  );
};
