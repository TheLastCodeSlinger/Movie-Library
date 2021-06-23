import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import LazyLoad from "react-lazyload";

import './Css/MovieDetails.css'
import '../containers/Css/SidebarItems.css'
import {MdPlayArrow} from "react-icons/md";

import tmdbAPI from '../API/tmdbAPI'
import MovieItem from './MovieItem'
import Cast from './Cast';
import {ExternalHomePage, Imdb, Trailer} from './ExternalLinks'




const MovieDetails = ({movieDetails, setMovieDetails}) => {
    const match = useRouteMatch();
    const [cast, setCast] = useState()
    const [recommendedMovies, setRecommendedMovies] = useState();
    const movieId = match.params.movieId
    const [trailer, setTrailer] = useState(null)
    
    useEffect(()=> {
        const fetchAllMovieDetails = async () => {
            const result = await tmdbAPI.get(`/movie/${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`);
            setMovieDetails(result.data)
        }
        fetchAllMovieDetails()
        console.log(movieDetails);
    }, [ movieId])


    useEffect(() => {
        const fetchCastMemberData = async () => {
            const result = await tmdbAPI.get(`/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API}&language=en-US`);
            setCast(result.data)
        }
        fetchCastMemberData();
    },[movieDetails, movieId])


    useEffect(() => {
        const fetchRecommendedMovies = async () => {
            const result = await tmdbAPI.get(`movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`)
            setRecommendedMovies(result.data)
        }
        fetchRecommendedMovies()
    },[movieDetails, movieId])

    useEffect(() => {
        const fetchTrailerDetails  = async () => {
            const result = await tmdbAPI.get(`movie/${movieId}/videos`, {
                params: {
                    language: 'en-US'
                }
            })
            setTrailer(result.data)
            console.log(result.data, "ME FROM TRAILER");
        }
        fetchTrailerDetails()
    }, [movieId])

    
        let movieIncludesGenres;
        if(movieDetails){
           movieIncludesGenres = movieDetails.genres.map(genre => (
            <div className="movieDetail-genreTagWrapper">
                <MdPlayArrow />
                {genre.name + " "}
            </div>
        )) }
    
    
    return (
        <LazyLoad offset={200} height={200}>
            {movieDetails &&
            <div className="movieDetailsWrapper" >
                <p>movieDetail-container</p>
                <div className="movieDetail-informations">
                    <div className="movieDetail-posterImage"> 
                        <img
                        src={`https://image.tmdb.org/t/p/original/${movieDetails.poster_path}`}
                        alt={`${movieDetails.title}`}
                        />
                    </div>
                    <div className="movieDetail-infoWrapper">
                        <div className="movieDetail-title">{movieDetails.title}</div>
                        <div className="movieDetail-tagline">{movieDetails.tagline}</div>
                        <div className="movieDetail-rating-stats-wrapper">
                            <div className="movieDetail-rating">RATING: {movieDetails.vote_average}</div>
                            <div className="movieDetailstats">{movieDetails.original_language} / {movieDetails.runtime + "MIN"} / {movieDetails.release_date.slice(0 , 4)}</div>
                        </div>
                        <h3>GENRES:</h3>
                            <div className="movieDetails-genrelist">{movieIncludesGenres}</div>
                        <h3>OVERVIEW:</h3>
                            <div className="movieDetails-plot">{movieDetails.overview}</div>
                            <div className="externalLinksWrapper">
                                {trailer && <Trailer url={trailer} />}
                                <Imdb url={movieDetails.id} />
                                <ExternalHomePage url={movieDetails.homepage} />
                            </div>
                            <div className="cast">
                                <h3>THE CAST:</h3>
                                { cast && <Cast cast={cast} />}
                            </div>
                    </div>
                </div>
                <h2 className="movieDetails-title">RECOMMENDATION</h2>
                <div className="recommendationWrapper">
                    {console.log(recommendedMovies)}
                    { recommendedMovies ? recommendedMovies.results.map(movie => (
                        <MovieItem 
                            movie={movie} 
                            key={movie.id} 
                            poster_path={movie.poster_path} 
                            title={movie.title} 
                            id={movie.id} />
                            )
                    ) : null}
                </div>
            </div>
            }

        </LazyLoad>
    )
}
export default MovieDetails;