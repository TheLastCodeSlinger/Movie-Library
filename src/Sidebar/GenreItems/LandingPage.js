import {useEffect} from "react"
import { useHistory } from "react-router";

import tmdbAPI from '../../API/tmdbAPI';
import Content from "../../Main/Content"

const LandingPage = ({setMovies, setPage, setGenreName, setId, movies, page, ids, genreName }) => {
    const history = useHistory()
    
    //Fetch Discover/Popular page and render it
    useEffect(() => {
        const fetchData = async() => {
            const result = await tmdbAPI.get(`/movie/popular?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`);
            setMovies(result.data)
            setGenreName("Popular")
            setId("popular")
            
        }
        history.push("/Discover/Popular/Page=1")
        setPage(1)
        fetchData()
        console.log("LandingPage?");
    }, [setMovies, setPage, history, setGenreName, setId])

    return <Content movies={movies} setMovies={setMovies} page={page} setPage={setPage} ids={ids} setId={setId} genreName={genreName} />

}

export default LandingPage;