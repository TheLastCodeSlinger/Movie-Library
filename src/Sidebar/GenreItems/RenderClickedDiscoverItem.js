import {useHistory, useLocation, useParams} from "react-router-dom";
import {useEffect} from "react"

import Content from '../../Main/Content'
import tmdbAPI from '../../API/tmdbAPI';

const RenderDiscover = ({ setMovies, setPage, setGenreName, setId, ids, movies, page, genreName}) => {
    //Get State from clicked <Link/>
    const location = useLocation();
    const id = location.state?.id;
    const {discName} = useParams();
    const history = useHistory()
    
    useEffect(() => {
            //Fetch the Discover-List> setMovies to this List > Rerender & Display Discover/XXX
        const fetchData = async() => {
            const result = await tmdbAPI.get(`/movie/${id}?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`);
            setMovies(result.data)
            console.log("HELO?");
            setId(id)
            };
            setPage(1)
            fetchData();
            setGenreName(discName)
            history.push(`/Discover/${discName}/Page=1`)
            console.log("RenderClickedDiscoverItem", id, discName);
        
        

    },[id, location, discName, setGenreName, setMovies, setPage, setId, history, movies, ids, page, genreName ])

    return <div>{console.log("HEOYP")}</div>

}

export default RenderDiscover;