import "./MovieItems.css";

import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

import Nothing from "../../../Assets/Nothing.svg";
import Rating from "../../Rating/Rating";

const MovieItem = (movie) => {
  const {vote_average, poster_path, title, id} = movie.movie
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <LazyLoad offset={200} height={200}>
      <Link
        to={`/Movie/${title}/${id}`}
        className="movieItemWrapper"
        key={id}
      >
        {!loading ? (
          <div className="loader">
            <Loader type="Puff" />
          </div>
        ) : null}
        <img
          className="movieItemImage"
          src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
          alt={title}
          onLoad={() => setLoading(true)}
          //If display: none, the spinner will be displayed.. If error occurs, Nothing.svg will be rendered and the error set to null.
          style={!loading ? { display: "none" } : {}}
          onError={(e) => {
            e.target.src = `${Nothing}`;
            e.target.onError = null;
          }}
        />
        <div
          className="movieItemTitle"
          style={!loading ? { display: "none" } : {}}
        >
          {title}
          <Rating number={vote_average / 2} />
        </div>
      </Link>
    </LazyLoad>
  );
};

export default MovieItem;
