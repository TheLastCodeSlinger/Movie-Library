import "./Content.css";

import PreviousPageButton from "../../PageNavButtons/LastPageButton";
import NextPageButton from "../../PageNavButtons/NextPageButton";
import MovieItem from "../MovieItem/MovieItem";


const Content = ({ genreId, page, setMovies, setPage, genreName, movies }) => {
  let renderMovieList;

  if (movies && movies.results.length > 0) {
    renderMovieList = movies.results.map((movie) => (
      <MovieItem
        movie={movie}
        key={movie.id}
        poster_path={movie.poster_path}
        title={movie.title}
        id={movie.id}
      />
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
        {renderMovieList && (
          <NextPageButton
            setMovies={setMovies}
            setPage={setPage}
            page={page}
            genreId={genreId}
            genreName={genreName}
          />
        )}
        {page > 1 ? (
          <PreviousPageButton
            setMovies={setMovies}
            setPage={setPage}
            page={page}
            genreId={genreId}
            genreName={genreName}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Content;
