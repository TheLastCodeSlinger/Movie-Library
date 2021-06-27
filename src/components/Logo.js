import "./Css/Logo.css";

import { ReactComponent as ReactAvatar } from "../Assets/Avatar.svg";
import { ReactComponent as RatingStar } from "../Assets/Star.svg";
import { ReactComponent as FullRatingStar } from "../Assets/StarFull.svg";
import { ReactComponent as ReactLogo } from "../Assets/TMDB-Logo.svg";

export const Logo = () => {
  return (
    <div className="logo">
      <ReactLogo />
    </div>
  );
};

export const Avatar = () => {
  return (
    <div>
      <ReactAvatar />
    </div>
  );
};

export const RatingIcon = () => {
  return (
    <div>
      <RatingStar />
    </div>
  );
};

export const FullRatingIcon = () => {
  return (
    <div>
      <FullRatingStar />
    </div>
  );
};
