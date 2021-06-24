import { Link } from "react-router-dom";
import "./Css/CastItem.css";

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
          <h2>No</h2>
        )}
      </div>
    </Link>
  );
};

export default CastItem;
