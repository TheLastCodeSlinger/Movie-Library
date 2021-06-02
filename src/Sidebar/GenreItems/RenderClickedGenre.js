import { useLocation, useParams} from "react-router-dom";
import {useEffect} from "react"

import tmdbAPI from '../../API/tmdbAPI';
import Content from '../../Main/Content'





const RenderGenre = ({setMovies, setPage, setGenreId, setGenreName, page, genreName, movies, genreId }) => {
    //Get Genre-Id from clicked <Link/>
    const location = useLocation();
    const id = location.state?.id;
    //Genname = action/drama/animation etc.
    const {genName, pageNr} = useParams()

    console.log("pageNr:", pageNr);
    
    //const match = useRouteMatch("/Genre/:discName/Page=:id")

    //Fetch the Genre-List > setMovies to this List > Rerender & Display Genre-Page1
    useEffect(() => {
            const fetchData = async() => {
            const result = await tmdbAPI.get(`/discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&page=1&with_genres=${id}`);
                setMovies(result.data)
                setGenreId(id)
                setPage(1)          
            }
            if(genreId !== id){
        fetchData()
        setGenreName(genName)
        console.log(genreId, "genreId", "match");
            }
    },[ id])

        console.log("genName",genName, "genreName", genreName,  "id", genreId, "page from genre", page);

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

export default RenderGenre;