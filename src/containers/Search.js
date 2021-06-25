import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import tmdbAPI from "../API/tmdbAPI";
import MovieItem from "../components/MovieItem";
import "./Css/Search.css";
import NextPageButton from "../components/PageNavButtons/NextPageButton";
import PreviousPageButton from "../components/PageNavButtons/LastPageButton";

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
  console.log(match.params.query);

  useEffect(() => {
    const fetchSearchMovies = async () => {
      const result = await tmdbAPI.get(`/search/movie`, {
        params: {
          language: "en-US",
          query: match.params.query,
          page: page,
        },
      });
      console.log(result.data, "RESSSSULT");
      setMovies(result.data);
      console.log(result.data.results);
    };
    console.log(genreName);
    fetchSearchMovies();
    if (genreName == !match.params.query) {
      setPage(1);
      setGenreName(match.params.query);
      setGenreId("query");
    }
  }, [match.params.query, page, setGenreId]);

  return (
    <div className="wrapper">
      <h2 className="titlee">{`Search for: "${match.params.query}"`}</h2>
      <div className="searchMoviesWrapper">
        {movies
          ? movies.results.map((movie) => (
              <MovieItem
                movie={movie}
                key={movie.id}
                poster_path={movie.poster_path}
                title={movie.title}
                id={movie.id}
              />
            ))
          : null}
        <div className="pageNavigation-container">
          <NextPageButton
            setMovies={setMovies}
            setPage={setPage}
            page={page}
            genreName={match.params.query}
            genreId={"query"}
          />
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
