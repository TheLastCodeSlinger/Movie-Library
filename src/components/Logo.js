import "./Css/Logo.css";
import { ReactComponent as ReactLogo } from "../Assets/TMDB-Logo.svg";
import { ReactComponent as ReactAvatar} from "../Assets/Avatar.svg"

export const Logo = () => {
  return (
    <div className="logo">
      <ReactLogo />
    </div>
  );
};


export const Avatar = () => {
  return (
    <div className="avatar">
      <ReactAvatar />
    </div>
  )
}
