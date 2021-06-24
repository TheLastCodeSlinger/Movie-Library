import { Link } from "react-router-dom";
import "./Css/CastItem.css";
import { Avatar } from "./Logo";

const CastItem = (cast) => {
  return (
    // Here could be a Link to the Persons-Profile
    <Link to={`/Person/${cast.cast.id}`}>
      {console.log(cast)}
      <div>
        {cast.cast.profile_path ? (
          <img
            className="profile-img"
            src={`https://image.tmdb.org/t/p/w185${cast.cast.profile_path}`}
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
