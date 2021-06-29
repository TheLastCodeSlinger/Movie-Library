import "./Search.css";

import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

import tmdbAPI from "../../../API/tmdbAPI";
import MovieItem from "../../../components/Movie/MovieItem/MovieItem";
import PreviousPageButton from "../../../components/PageNavButtons/LastPageButton";
import NextPageButton from "../../../components/PageNavButtons/NextPageButton";

const Search = ({ ...props }) => {
  const {
    page,
    movies,
    setMovies,
    setPage,
    setGenreId,
    setGenreName,
    genreName,
    genreId,
  } = props;
  const match = useRouteMatch();

  let renderMovieList;
  if (movies && movies.results.length > 1) {
    renderMovieList = movies.results.map((movie) => (
      <MovieItem movie={movie} key={movie.id} />
    ));
  } else {
    renderMovieList = (
      <h2 style={{ fontSize: "2rem" }}>Couldn't find a match..</h2>
    );
  }

  //Get the searchquery from URL and then use it to search fetch data
  useEffect(() => {
    const fetchSearchMovies = async () => {
      const result = await tmdbAPI.get(`/search/movie`, {
        params: {
          language: "en-US",
          query: match.params.query,
          page: page,
        },
      });
      setMovies(result.data);
    };
    fetchSearchMovies();
    //Rendercondition: Checks if new search has been used.. setGenreId to "query" used to navigate/trigger search.js.
    if (match.params.query !== genreName) {
      setGenreName(match.params.query);
      setPage(1);
      setGenreId("query");
    }
  }, [
    genreName,
    setGenreName,
    genreId,
    match.params.query,
    page,
    setGenreId,
    setPage,
    setMovies,
  ]);

  return (
    <div className="wrapper">
      <h2 className="titlee">{`Search for: "${match.params.query}"`}</h2>
      <div className="searchMoviesWrapper">{renderMovieList}</div>
      <div className="pageNavigation-container">
        {renderMovieList ? <NextPageButton props={props} /> : null}
        {page > 1 ? <PreviousPageButton props={props} /> : null}
      </div>
    </div>
  );
};
export default Search;
