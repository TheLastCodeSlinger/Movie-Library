import "./Css/CastItem.css";

import { Link } from "react-router-dom";

import { Avatar } from "./IconsAsComponent";

const CastItem = (cast) => {
  return (
    <Link to={`/Person/${cast.cast.id}`}>
      <div>
        {cast.cast.profile_path ? (
          <img
            className="profile-img"
            src={`https://image.tmdb.org/t/p/w185${cast.cast.profile_path}`}
            alt={cast.cast.name}
          />
        ) : (
          <div className="profile-img">
            <Avatar className="profile-img" />
          </div>
        )}
      </div>
    </Link>
  );
};

export default CastItem;
