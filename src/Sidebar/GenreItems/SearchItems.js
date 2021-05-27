import { Fragment, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import "./SearchItems.css"

import tmdbAPI from '../../API/tmdbAPI'
import {SidebarRenderDiscoverMovies, SidebarRenderGenre} from './RenderSearchItems'
import RenderGenre from './RenderClickedGenre';    
import RenderDiscover from './RenderClickedDiscoverItem';
import LandingPage from './LandingPage';
import MovieDetails from '../../Main/MovieDetails'


const SearchItems = ({setMovies, setPage, setId, setGenreName, page, genreName}) => {
    const [genre, setGenre] = useState(0)

    useEffect(() => {
        //Fetch an Array, where all Genre-Tags are listed as strings.
        const fetchData = async () => {
            const result = await tmdbAPI.get(`/genre/movie/list?api_key=${process.env.REACT_APP_API}&language=en-US`);
            setGenre(result.data)
        };
        fetchData()
        console.log("Searchitems");
    }, [])



    return (
        <Fragment >
        <div className="searchbarItems">
            <h2>DISCOVER</h2>
                { genre !== 0 ? <SidebarRenderDiscoverMovies page={page} /> : null}

            <h2>GENRE</h2>
                {genre !== 0 ? genre.genres.map(genre => (
                    <SidebarRenderGenre page={page} genre={genre} key={genre.id} />
                 )) : null}
        </div>

        <Switch>
            <Route path="/" exact children={<LandingPage setMovies={setMovies} setPage={setPage} setGenreName={setGenreName} setId={setId}   />} />
            <Route path={`/Discover/:discName`} exact strict  children={<RenderDiscover setMovies={setMovies} setPage={setPage} setId={setId} setGenreName={setGenreName} page={page} />} />
            <Route path={`/Genre/:genName`}  exact strict children={<RenderGenre setMovies={setMovies} setPage={setPage} setId={setId} setGenreName={setGenreName} page={page} genreName={genreName} />  }    /> 
            <Route path="/Movie/:movieName/" ><MovieDetails /></Route>
        </Switch>
        </Fragment>

    )
}

export default SearchItems;