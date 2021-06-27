import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import LazyLoad from "react-lazyload";

import "./Css/MovieDetails.css";
import "../containers/Css/SidebarItems.css";
import { MdPlayArrow } from "react-icons/md";

import { animateScroll as scroll } from "react-scroll";
import tmdbAPI from "../API/tmdbAPI";
import MovieItem from "./MovieItem";
import Cast from "./Cast";
import { ExternalHomePage, Imdb, Trailer } from "./ExternalLinks";
import Rating from "./Rating";
import Nothing from "../Assets/Nothing.svg";

const MovieDetails = ({ movieDetails, setMovieDetails, isMobile }) => {
  const match = useRouteMatch();
  const movieId = match.params.movieId;
  const [cast, setCast] = useState();
  const [recommendedMovies, setRecommendedMovies] = useState();
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchAllMovieDetails = async () => {
      const result = await tmdbAPI.get(
        `/movie/${movieId}?api_key=${process.env.REACT_APP_API}&language=en-US`
      );
      setMovieDetails(result.data);
    };
    fetchAllMovieDetails();
    scroll.scrollToTop({
      smooth: true,
      duration: 600,
      offSet: 100,
    });
  }, [movieId, setMovieDetails]);

  useEffect(() => {
    const fetchCastMemberData = async () => {
      const result = await tmdbAPI.get(
        `/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API}&language=en-US`
      );
      setCast(result.data);
    };
    fetchCastMemberData();
  }, [movieDetails, movieId]);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      const result = await tmdbAPI.get(`movie/${movieId}/recommendations`, {
        params: {
          language: "en-US",
          page: 1,
        },
      });
      setRecommendedMovies(result.data);
    };
    fetchRecommendedMovies();
  }, [movieDetails, movieId]);

  useEffect(() => {
    const fetchTrailerDetails = async () => {
      const result = await tmdbAPI.get(`movie/${movieId}/videos`, {
        params: {
          language: "en-US",
        },
      });
      setTrailer(result.data);
      console.log(result.data, "ME FROM TRAILER");
    };
    fetchTrailerDetails();
  }, [movieId]);

  let movieIncludesGenres;
  if (movieDetails) {
    movieIncludesGenres = movieDetails.genres.map((genre) => (
      <div className="movieDetail-genreTagWrapper">
        <MdPlayArrow />
        {genre.name + " "}
      </div>
    ));
  }

  return (
    <>
      {movieDetails && (
        <div className="wrapper">
          <LazyLoad offset={200} height={200}>
            <div className="movieDetail-wrapper">
              <div className="movieDetail-posterImageWrapper">
                <img
                  src={`https://image.tmdb.org/t/p/w780/${movieDetails.poster_path}`}
                  alt={`${movieDetails.title}`}
                  onError={(e) => {
                    e.target.src = `${Nothing}`;
                    e.target.onError = null;
                  }}
                />
              </div>
              <div className="movieDetail-infoWrapper">
                <div className="header">{movieDetails.title}</div>
                <div className="movieDetail-tagline">
                  {movieDetails.tagline}
                </div>
                <div className="movieDetail-rating-stats-wrapper">
                  <div className="movieDetail-rating">
                    RATING: <Rating number={movieDetails.vote_average / 2} />
                  </div>
                  <div className="movieDetail-stats">
                    {movieDetails.original_language} /{" "}
                    {movieDetails.runtime + "MIN"} /{" "}
                    {movieDetails.release_date.slice(0, 4)}
                  </div>
                </div>
                <h3>GENRES:</h3>
                <div className="movieDetails-genrelist">
                  {movieIncludesGenres}
                </div>
                <h3>OVERVIEW:</h3>
                <div className="movieDetails-plot">{movieDetails.overview}</div>
                <div className="externalLinksWrapper">
                  {trailer && <Trailer url={trailer} />}
                  <Imdb url={movieDetails.id} />
                  <ExternalHomePage url={movieDetails.homepage} />
                </div>
                <h3>THE CAST:</h3>
                {cast && <Cast cast={cast} isMobile={isMobile} />}
              </div>
            </div>
          </LazyLoad>
          <h2 className="header">RECOMMENDATION</h2>
          <div className="recommendationWrapper">
            {recommendedMovies
              ? recommendedMovies.results.map((movie) => (
                  <MovieItem
                    movie={movie}
                    key={movie.id}
                    poster_path={movie.poster_path}
                    title={movie.title}
                    id={movie.id}
                  />
                ))
              : null}
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
