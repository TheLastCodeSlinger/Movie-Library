import { useEffect } from "react"
import { useHistory } from "react-router";

import tmdbAPI from '../../API/tmdbAPI';
import Content from "../../Main/Content"

const LandingPage = ({setMovies, setPage, setGenreName, setGenreId, movies, page, genreId, genreName }) => {
    const history = useHistory()
    
    //Fetch Discover/Popular page and render it
    useEffect(() => {
        const fetchData = async() => {
            const result = await tmdbAPI.get(`/movie/popular?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`);
                setMovies(result.data)
                setGenreName("Popular")
                setGenreId("popular")
                setPage(1)
                console.log("Fetching & Setting movies/popular - APP/JS");
            }
                history.push("/Discover/Popular/Page=1")
                fetchData()
                console.log("LandingPage?");
            }, [genreId])

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

export default LandingPage;