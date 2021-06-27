import "./Css/MobileSidebar.css";

import { Fragment, useState } from "react";

import MobileIconSvg from "../Assets/MobileIcon.svg";
import Drawer from "./Drawer";

const MobileSidebar = ({ genre }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSidebarHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <div className="iconWrapper" onClick={openSidebarHandler}>
        <img src={`${MobileIconSvg}`} />
      </div>
      {isOpen ? (
        <div className="mobileSidebar">
          <Drawer
            isOpen={isOpen}
            openSidebarHandler={openSidebarHandler}
            genre={genre}
          />
        </div>
      ) : null}
    </Fragment>
  );
};

export default MobileSidebar;
