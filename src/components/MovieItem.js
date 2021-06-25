import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";

import "./Css/MovieItems.css";
import Loader from "react-loader-spinner";
import Rating from "./Rating";

import Nothing from "../Assets/Nothing.svg";

const MovieItem = (movie) => {
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(false);

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  return (
    <LazyLoad offset={200} height={200}>
      <Link
        to={`/Movie/${movie.title}/${movie.id}`}
        className="movieItemWrapper"
        key={movie.id}
      >
        {!loading ? (
          <div className="loader">
            <Loader type="Puff" />
          </div>
        ) : null}
        <img
          className="movieItemImage"
          src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
          alt={movie.title}
          onLoad={() => setLoading(true)}
          //If display: none, the spinner will be displayed
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
          {movie.title}
          <Rating number={movie.movie.vote_average / 2} />
        </div>
      </Link>
    </LazyLoad>
  );
};

export default MovieItem;
