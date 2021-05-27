import { useEffect, useState} from "react"
import LazyLoad from "react-lazyload"

import "./MovieItems.css"
import Loader from "react-loader-spinner"
import { Link } from "react-router-dom"

const MovieItem = movie => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => setLoading(false)
    },[])

    return  ( 
        <LazyLoad  offset={200} height={200}>
            <Link to={`/Movie/${movie.title}/${movie.id}`} className="itemBox-container" key={movie.id}>
                {!loading ? <div className="loada"><Loader type="Puff"  /></div> : null}
                <img className="itemBoxImage" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" onLoad={()=>setLoading(true)} style={!loading ? {display: "none"} : {}}  />
                <div className="movie-title" style={!loading ? {display: "none" } : {}}>{movie.title}</div>
            </Link>
       </LazyLoad>
        )
}

export default MovieItem;