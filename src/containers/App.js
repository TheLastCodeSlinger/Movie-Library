import {useState, useEffect} from "react"
import {Switch, Route, BrowserRouter as Router} from "react-router-dom"

import './Css/App.css';

import Sidebar from './Sidebar'

import tmdbAPI from '../API/tmdbAPI'
import LandingPage from "./Home"
import RenderDiscover from './Discover'
import RenderGenre from './Genre'
import MovieDetails from '../components/MovieDetails'

function App() {
  const [movies, setMovies] = useState();
  const [page, setPage] = useState(1);
  const [genreId, setGenreId] = useState();
  const [genreName, setGenreName] = useState();
  const [genre, setGenre] = useState(0);
  const [movieDetails, setMovieDetails] = useState();

  //Loading the movies for the landing/first page and setting states
  useEffect(() => {
      const fetchPopularDataInitial = async () => { 
          const result = await tmdbAPI.get(`/movie/popular?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`);
                setMovies(result.data);
                setGenreName("Popular")
                setGenreId("popular")
              };
                fetchPopularDataInitial()
                console.log("Fetching & Setting movies/popular - APP/JS");
          },[])
          


          //Fetch an Array, where all Genre-Tags are listed as strings.
  useEffect(() => {
        const fetchGenreCateforiesData = async () => {
          const result = await tmdbAPI.get(`/genre/movie/list?api_key=${process.env.REACT_APP_API}&language=en-US`);
              setGenre(result.data)
            };
              fetchGenreCateforiesData()
              console.log("Fetch Genre-Tags (action,comedy etc)");
          }, [])

  return (
    
      <Router>
        <div className="container">
          <Sidebar
            setMovies={setMovies} 
            setPage={setPage} 
            movies={movies} 
            setGenreId={setGenreId} 
            setGenreName={setGenreName} 
            page={page} 
            genreName={genreName} 
            genre={genre} 
          />
        
        <Switch>
              <Route path="/" exact  >
                <LandingPage 
                  setMovies={setMovies} 
                  setPage={setPage} 
                  setGenreName={setGenreName} 
                  setGenreId={setGenreId} 
                  page={page} 
                  genreId={genreId} 
                  movies={movies} 
                  genreName={genreName} 
                  genre={genre}   
                />
              </Route>

              <Route path={`/Discover/:discName/Page=:pageNr`} >
                <RenderDiscover 
                  setMovies={setMovies} 
                  movies={movies} 
                  setPage={setPage} 
                  genreId={genreId} 
                  genreName={genreName} 
                  setGenreId={setGenreId} 
                  setGenreName={setGenreName} 
                  page={page} 
                  genre={genre} 
                />
              </Route>

              <Route path={`/Genre/:genName/Page=:pageNr`} > 
                <RenderGenre 
                  setMovies={setMovies} 
                  movies={movies} 
                  setPage={setPage} 
                  genreId={genreId} 
                  setGenreId={setGenreId} 
                  setGenreName={setGenreName} 
                  page={page} 
                  genreName={genreName} 
                  genre={genre} 
                /> 
              </Route> 

              <Route path="/Movie/:movieName/:movieId"  >
                <MovieDetails 
                movieDetails={movieDetails}
                setMovieDetails={setMovieDetails}
                />
              </Route>

              <Route path="*">
                <div>ERROR</div>
              </Route>
        </Switch></div>
      </Router>
    );
  }

export default App;
