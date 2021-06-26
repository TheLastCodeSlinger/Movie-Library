import "./Css/Sidebar.css";
import "./Css/SidebarItems.css";

import {Logo} from "../components/Logo";
import {
  SidebarRenderLinksDiscovery,
  SidebarRenderLinksGenre,
} from "./SidebarItems";

const Sidebar = ({ genre }) => {
  return (
    <div className="sidebarWrapper">
      <Logo />

      <div className="sidebarItemsWrapper">
        <h2>DISCOVER</h2>
        {genre && (
          <SidebarRenderLinksDiscovery />
        )}
        <h2>GENRE</h2>
        {genre &&
          genre.genres.map((genre) => (
            <SidebarRenderLinksGenre
              genre={genre}
              key={genre.id}
            />
          ))}
        ;
      </div>
    </div>
  );
};

export default Sidebar;
