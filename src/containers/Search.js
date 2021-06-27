import "./Css/Search.css";

import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";

import tmdbAPI from "../API/tmdbAPI";
import MovieItem from "../components/MovieItem";
import PreviousPageButton from "../components/PageNavButtons/LastPageButton";
import NextPageButton from "../components/PageNavButtons/NextPageButton";

const Search = ({
  page,
  movies,
  setMovies,
  setPage,
  setGenreId,
  setGenreName,
  genreName,
}) => {
  const match = useRouteMatch();
  
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
    if (genreName !== match.params.query) {
      setPage(1);
      setGenreName(match.params.query);
      setGenreId("query");
    }
  }, [match.params.query, page, setGenreId, setGenreName, setPage, setMovies]);

  return (
    <div className="wrapper">
      <h2 className="titlee">{`Search for: "${match.params.query}"`}</h2>
      <div className="searchMoviesWrapper">
        {renderMovieList}
        <div className="pageNavigation-container">
          {renderMovieList ? (
            <NextPageButton
              setMovies={setMovies}
              setPage={setPage}
              page={page}
              genreName={match.params.query}
              genreId={"query"}
            />
          ) : null}
          {page > 1 ? (
            <PreviousPageButton
              setMovies={setMovies}
              setPage={setPage}
              page={page}
              genreId={"query"}
              genreName={match.params.query}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Search;
