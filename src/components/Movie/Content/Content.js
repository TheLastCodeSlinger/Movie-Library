import "./Content.css";

import PreviousPageButton from "../../PageNavButtons/LastPageButton";
import NextPageButton from "../../PageNavButtons/NextPageButton";
import MovieItem from "../MovieItem/MovieItem";

const Content = ({ props, option }) => {
  const { page, genreName, movies } = props;
  let renderMovieList;

  if (movies && movies.results.length > 0) {
    renderMovieList = movies.results.map((movie) => (
      <MovieItem movie={movie} key={movie.id} />
    ));
  }
  return (
    <div className="container-main">
      <div className="content-header">
        <div className="content-direction">
          {genreName ? genreName : "POPULAR"}
        </div>
        <div className="movie">Movies</div>
      </div>
      <div className="content-movies">
        {/* Rendering the Moives to the display */}
        {renderMovieList}
      </div>
      <div className="pageNavigation-container">
        {renderMovieList && <NextPageButton props={props} option={option} />}
        {page > 1 ? <PreviousPageButton option={option} props={props} /> : null}
      </div>
    </div>
  );
};

export default Content;
