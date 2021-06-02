import { useLocation, useParams} from "react-router-dom";
import { useEffect} from "react"

import Content from '../../Main/Content'
import tmdbAPI from '../../API/tmdbAPI';





const RenderDiscover = ({ setMovies, setPage, setGenreName, setGenreId, genreId, movies, page, genreName}) => {
    //Get State from clicked <Link/>
    const location = useLocation();
    const id = location.state?.id;
    const {discName, pageNr} = useParams();
    
    
    //Fetch the Discover-List> setMovies to this List > Rerender & Display Discover/XXX
    useEffect(() => {
        const fetchData = async() => {
            const result = await tmdbAPI.get(`/movie/${id}?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`);
                setMovies(result.data)
                setGenreId(id)
                setPage(1)
            };
            //Safety - only fetch new Discovery/setPage if a new link is clicked.. Compares the genreId(which is saved in a State) with the clicked Link(passes id as state). prevents unwanted resets,
            if(genreId !== id){
                fetchData();
                setGenreName(discName)
                console.log("RenderClickedDiscoverItem", id, discName);
                }
            },[discName, genreId, id, location])

            console.log(page, "from discover","pageNr:", pageNr);

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