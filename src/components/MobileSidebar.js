import "./Css/MobileSidebar.css";
import MobileIconSvg from "../Assets/MobileIcon.svg";
import { useState, Fragment } from "react";
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
            setIsOpen={setIsOpen}
            openSidebarHandler={openSidebarHandler}
            genre={genre}
          />
        </div>
      ) : null}
    </Fragment>
  );
};

export default MobileSidebar;
