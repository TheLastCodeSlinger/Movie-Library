import { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import "./Css/App.css";

import Sidebar from "./Sidebar";
import SearchBar from "../components/Searchbar";

import tmdbAPI from "../API/tmdbAPI";
import Home from "./Home";
import RenderDiscover from "./Discover";
import RenderGenre from "./Genre";
import MovieDetails from "../components/MovieDetails";
import history from "../history";
import Person from "./Person";
import Search from "./Search";
import MobileSidebar from "../components/MobileSidebar";

function App() {
  const [movies, setMovies] = useState();
  const [page, setPage] = useState(1);
  const [genreId, setGenreId] = useState();
  const [genreName, setGenreName] = useState();
  const [genre, setGenre] = useState(0);
  const [movieDetails, setMovieDetails] = useState();
  const [isMobile, setisMobile] = useState(null);

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

  useEffect(() => {
    const fetchGenreCateforiesData = async () => {
      const result = await tmdbAPI.get("/configuration");
      console.log(result.data, "meConfig", "next tmdbAPI", tmdbAPI);
    };
    fetchGenreCateforiesData();
  }, []);

  // Set amount of items to show on slider based on the width of the element
  const changeMobile = () => {
    window.matchMedia("(max-width: 1000px)").matches
      ? setisMobile(true)
      : setisMobile(false);
  };

  useEffect(() => {
    changeMobile();
    window.addEventListener("resize", changeMobile);
    return () => window.removeEventListener("resize", changeMobile);
  }, []);

  return (
    <Router history={history}>
      <div className="container">
        <div className="searchbarWrapper">
          <SearchBar />
        </div>
        {!isMobile ? <Sidebar  genre={genre} /> : <MobileSidebar genre={genre} />}
        {console.log(isMobile)}

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
            />
          </Route>

          <Route path="*">
            <div>ERROR</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
