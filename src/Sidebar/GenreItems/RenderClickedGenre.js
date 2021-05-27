import {useHistory, useLocation, useParams} from "react-router-dom";
import {Fragment, useEffect} from "react"
import tmdbAPI from '../../API/tmdbAPI';
import Content from '../../Main/Content'

const RenderGenre = ({setMovies, setPage, setId, setGenreName, page, genreName, movies, ids }) => {
    //Get Genre-Id from clicked <Link/>
    const location = useLocation();
    const id = location.state?.id;
    const {genName} = useParams()
    const history = useHistory()

    
    //Fetch the Genre-List > setMovies to this List > Rerender & Display Genre-Page1
    useEffect(() => {
        const fetchData = async() => {
            const result = await tmdbAPI.get(`/discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&page=1&with_genres=${id}`);
            setMovies(result.data)
            console.log(genName, "CLICKED GENRE", genreName);
            setId(id)
        }
        setGenreName(genName)
        setPage(1)
        fetchData()
        console.log(genName);
        history.push(`/Genre/${genName}/Page=1`)
        },[id, location, genName, setMovies, setPage, setId, setGenreName, genreName, history])

    return (
        <Fragment>
            <Content movies={movies} setMovies={setMovies} page={page} setPage={setPage} ids={ids} setId={setId} genreName={genreName} />
            
        </Fragment>
    )

}

export default RenderGenre;