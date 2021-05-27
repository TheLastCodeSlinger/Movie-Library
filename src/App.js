import {useState, useEffect} from "react"
//import {Switch, Route} from "react-router-dom"

import './App.css';
import Sidebar from "./Sidebar/SidebarLayout";
import Content from "./Main/Content";
import tmdbAPI from './API/tmdbAPI'
//import LandingPage from "./Sidebar/GenreItems/LandingPage"
//import RenderDiscover from './Sidebar/GenreItems/RenderClickedDiscoverItem'
//import RenderGenre from './Sidebar/GenreItems/RenderClickedGenre'
//import MovieDetails from './Main/MovieDetails'

function App() {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [id, setId] = useState(null);
  const [genreName, setGenreName] = useState(null);
  

  useEffect(() => {
      const fetchData = async () => { 
          const result = await tmdbAPI.get(`/movie/popular?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`);
                setMovies(result.data);
                setPage(result.data.page);
              };
                fetchData()
                console.log("Fetching & Setting movies/popular - APP/JS");
                
          },[])

  return (
    <div className = "container" >
      <Sidebar setMovies={setMovies} setPage={setPage} movies={movies} setId={setId} setGenreName={setGenreName} page={page} genreName={genreName}/>
      <Content movies={movies} setMovies={setMovies} page={page} setPage={setPage} id={id} setId={setId} genreName={genreName} /> 
{/*
      <Switch>
            <Route path="/" exact children={<LandingPage setMovies={setMovies} setPage={setPage} setGenreName={setGenreName} setId={setId} page={page} ids={id} movies={movies} genreName={genreName}   />} />
            <Route path={`/Discover/:discName`} exact strict  children={<RenderDiscover setMovies={setMovies} movies={movies} setPage={setPage} ids={id} genreName={genreName} setId={setId} setGenreName={setGenreName} page={page} />} />
            <Route path={`/Genre/:genName`}  exact strict children={<RenderGenre setMovies={setMovies} movies={movies} setPage={setPage} ids={id} setId={setId} setGenreName={setGenreName} page={page} genreName={genreName} />  }    /> 
            <Route path="/Movie/:movieName/" ><MovieDetails /></Route>
        </Switch>
*/}
    </div>
  );
}

export default App;
