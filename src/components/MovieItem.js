import { useEffect, useState} from "react"
import LazyLoad from "react-lazyload"
import { Link } from "react-router-dom"

import "./Css/MovieItems.css"

import Loader from "react-loader-spinner"

const MovieItem = movie => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => setLoading(false)
    },[])

    return  ( 
        <LazyLoad  offset={200} height={200}>
            <Link to={`/Movie/${movie.title}/${movie.id}`} 
                    className="movieItemWrapper" 
                    key={movie.id}>
                {!loading ? <div className="loader">
                                <Loader type="Puff"  />
                            </div> : null}
                <img 
                    className="movieItemImage" 
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} 
                    alt={movie.title} 
                    onLoad={()=>setLoading(true)} 
                    //If display: none, the spinner will be displayed
                    style={!loading ? {display: "none"} : {}}  
                />
                <div 
                    className="movieItemTitle" 
                    style={!loading ? {display: "none" } : {}}>
                    {movie.title}
                </div>
            </Link>
       </LazyLoad>
        )
    }

export default MovieItem;