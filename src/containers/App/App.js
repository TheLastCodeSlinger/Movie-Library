import "./App.css";

import { createBrowserHistory } from "history";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import tmdbAPI from "../../API/tmdbAPI";
import MobileSidebar from "../../components/MobileUi/MobileSidebar";
import SearchBar from "../../components/Searchbar/Searchbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import MovieDetails from "../MovieDetails/MovieDetails";
import RenderDiscover from "../Routes/Discover";
import RenderGenre from "../Routes/Genre";
import Home from "../Routes/Home";
import Person from "../Routes/Person/Person";
import Search from "../Routes/Search/Search";

function App() {
  const [movies, setMovies] = useState();
  const [page, setPage] = useState(1);
  const [genreId, setGenreId] = useState();
  const [genreName, setGenreName] = useState();
  const [genre, setGenre] = useState(0);
  const [movieDetails, setMovieDetails] = useState();
  const [isMobile, setisMobile] = useState(null);
  const history = createBrowserHistory();

  //Loading the movies for the landing/first page and setting states
  useEffect(() => {
    const fetchPopularDataInitial = async () => {
      const result = await tmdbAPI.get(
        `/movie/popular?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`
      );
      setMovies(result.data);
      setGenreName("Popular");
      setGenreId("popular");
    };
    fetchPopularDataInitial();
  }, []);

  //Fetch an Array, where all Genre-Tags are listed as strings.
  useEffect(() => {
    const fetchGenreCateforiesData = async () => {
      const result = await tmdbAPI.get(
        `/genre/movie/list?api_key=${process.env.REACT_APP_API}&language=en-US`
      );
      setGenre(result.data);
    };
    fetchGenreCateforiesData();
  }, []);

  // Called from useEffect to check the screenwidth. Changes to MobileSidebar and Cast-Size
  const changeMobile = () => {
    window.matchMedia("(max-width: 1000px)").matches
      ? setisMobile(true)
      : setisMobile(false);
  };

  // Execudes on every resize
  useEffect(() => {
    changeMobile();
    window.addEventListener("resize", changeMobile);
    return () => window.removeEventListener("resize", changeMobile);
  }, []);

  return (
    <Router history={history}>
      <div className="container">
        <div className="searchbarWrapper">
          <SearchBar setGenreName={setGenreName} />
        </div>
        {!isMobile ? (
          <Sidebar genre={genre} />
        ) : (
          <MobileSidebar genre={genre} />
        )}

        <Switch>
          <Route path="/" exact>
            <Home
              setMovies={setMovies}
              setPage={setPage}
              setGenreName={setGenreName}
              setGenreId={setGenreId}
              page={page}
              genreId={genreId}
              movies={movies}
              genreName={genreName}
            />
          </Route>

          <Route path={`/Discover/:discName`}>
            <RenderDiscover
              setMovies={setMovies}
              movies={movies}
              setPage={setPage}
              genreId={genreId}
              genreName={genreName}
              setGenreId={setGenreId}
              setGenreName={setGenreName}
              page={page}
            />
          </Route>

          <Route path={`/Genre/:genName`}>
            <RenderGenre
              setMovies={setMovies}
              movies={movies}
              setPage={setPage}
              genreId={genreId}
              setGenreId={setGenreId}
              setGenreName={setGenreName}
              page={page}
              genreName={genreName}
            />
          </Route>

          <Route path="/Movie/:movieName/:movieId">
            <MovieDetails
              movieDetails={movieDetails}
              setMovieDetails={setMovieDetails}
              isMobile={isMobile}
            />
          </Route>

          <Route path="/Person/:personId">
            <Person />
          </Route>

          <Route path="/search/:query">
            <Search
              setMovies={setMovies}
              movies={movies}
              page={page}
              setPage={setPage}
              setGenreName={setGenreName}
              setGenreId={setGenreId}
              genreName={genreName}
            />
          </Route>

          <Route path="*">
            <div style={{ fontSize: "2rem", margin: "20rem auto" }}>
              Couldn't find this Site...
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
