import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";

import './MovieDetails.css'

import tmdbAPI from '../API/tmdbAPI'
import LazyLoad from "react-lazyload";


const MovieDetails = ({movieDetails, setMovieDetails}) => {
    const match = useRouteMatch();
    const [cast, setCast] = useState(null)
    
    useEffect(()=> {
        const movieId = match.params.movieId;
        const fetchData = async () => {
            const result = await tmdbAPI.get(`/movie/${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`);
            setMovieDetails(result.data)
        }
        fetchData()
    }, [MovieDetails])

    useEffect(() => {
        const movieId = match.params.movieId;
        const fetchData = async () => {
            const result = await tmdbAPI.get(`/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API}&language=en-US`);
            setCast(result.data)
        }
        fetchData();
    },[movieDetails])
    
    
    return (
        <LazyLoad>
            {console.log(movieDetails,"cast", cast)}
            {movieDetails &&
        <div className="movieDetail-container" >
            <p>movieDetail-container</p>
            <div className="movieDetail-informations">
                <div className="movieDetail-img"> 
                    <img
                    src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                    alt=""
                     />
                </div>
                <div className="movieDetail-infos">
                    <div className="original-title">{movieDetails.original_title}</div>
                    <div className="tagline">{movieDetails.tagline}</div>
                    <div className="rating-stats-container">
                        <div className="rating">RATING: {movieDetails.vote_average}</div>
                        <div className="stats">{movieDetails.spoken_languages[0].name} / {movieDetails.runtime + "MIN"} / {movieDetails.release_date.slice(0 , 4)}</div>
                    </div>
                    <h3>GENRES:</h3>
                    <div className="genrelist">{movieDetails.genres.map(genre => genre.name + " ")}</div>
                    <h3>OVERVIEW:</h3>
                    <div className="plot">{movieDetails.overview}</div>
                </div>
            </div>
        </div>
         }

        </LazyLoad>
    )
}
export default MovieDetails;