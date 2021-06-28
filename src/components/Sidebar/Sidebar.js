import "./Sidebar.css";
import "./SidebarItems/SidebarItems.css";

import { TmdbLogo } from "../IconsAsComponent/IconsAsComponent";
import { SidebarItemDiscovery, SidebarItemGenre } from "./SidebarItems/SidebarItems";

const Sidebar = ({ genre }) => {
  return (
    <div className="sidebarWrapper">
      <TmdbLogo />
      <div className="sidebarItemsWrapper">
        <h2>DISCOVER</h2>
        {genre && <SidebarItemDiscovery />}
        <h2>GENRE</h2>
        {genre &&
          genre.genres.map((genre) => (
            <SidebarItemGenre genre={genre} key={genre.id} />
          ))}
        ;
      </div>
    </div>
  );
};

export default Sidebar;
