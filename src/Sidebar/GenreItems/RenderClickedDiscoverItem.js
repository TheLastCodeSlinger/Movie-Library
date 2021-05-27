import { useLocation, useParams, useHistory} from "react-router-dom";
import { useEffect} from "react"

import Content from '../../Main/Content'
import tmdbAPI from '../../API/tmdbAPI';

const RenderDiscover = ({ setMovies, setPage, setGenreName, setGenreId, genreId, movies, page, genreName}) => {
    const history = useHistory();
    //Get State from clicked <Link/>
    const location = useLocation();
    const id = location.state?.id;
    const {discName} = useParams();
    
    useEffect(() => {
            //Fetch the Discover-List> setMovies to this List > Rerender & Display Discover/XXX
        const fetchData = async() => {
            const result = await tmdbAPI.get(`/movie/${id}?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`);
                setMovies(result.data)
                setGenreId(id)
            };
                setPage(1)
                fetchData();
                setGenreName(discName)
                history.push(`/Discover/${discName}/Page=1`)
                console.log("RenderClickedDiscoverItem", id, discName);
            },[discName])

    return (
        <Content 
            movies={movies} 
            setMovies={setMovies} 
            page={page} 
            setPage={setPage} 
            genreId={genreId} 
            setGenreId={setGenreId} 
            genreName={genreName} 
        />
        )
    }

export default RenderDiscover;