import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import tmdbAPI from "../API/tmdbAPI";
import "./Css/Person.css";
import "../components/Css/ExternalLinks.css";
import MovieItem from "../components/MovieItem";
import { Avatar } from "../components/Logo";
import {animateScroll as scroll} from 'react-scroll'

const Person = () => {
  const match = useRouteMatch();
  const [personData, setPersonData] = useState();
  const [movieCredits, setMovieCredits] = useState();
  console.log(match.params.personId);

  useEffect(() => {
    const fetchPersonData = async () => {
      const result = await tmdbAPI.get(`/person/${match.params.personId}`, {
        params: {
          language: "en-US",
        },
      });
      setPersonData(result.data);
      scroll.scrollToTop({
        smooth: true,
        duration: 600,
        offSet: 100,
      });
    };
    fetchPersonData();
  }, [match.params.personId]);

  useEffect(() => {
    const fetchCreditMovies = async () => {
      const result = await tmdbAPI.get(
        `/person/${match.params.personId}/movie_credits`,
        {
          params: {
            language: "en-US",
          },
        }
      );
      setMovieCredits(result.data);
    };
    fetchCreditMovies();
  }, [match.params.personId]);

  return (
    <div className="wrapper">
      {personData && (
        <div className="personWrapper">
          <div className="personImgWrapper">
            {personData.profile_path ? (
              <img
                className="personImg"
                src={`https://image.tmdb.org/t/p/w780/${personData.profile_path}`}
                alt={personData.name}
              />
            ) : (
              <Avatar />
            )}
          </div>
          <div className="personDetails">
            <div className="personName">{personData.name}</div>
            <div className="personBirthday">{personData.birthday}</div>
            <h2>Biography</h2>
            {personData.biography ? (
              <div className="personBiography">{personData.biography}</div>
            ) : (
              <p className="personBiography">
                There is no biography available...
              </p>
            )}
            <div className="personExternalLinks">
              {personData.homepage ? (
                <a
                  className="link"
                  href={personData.homepage}
                  target="_blank"
                  rel="noreferrer"
                >
                  HOMEPAGE
                </a>
              ) : null}
              {personData.id ? (
                <a
                  className="link"
                  href={`https://www.themoviedb.org/person/${personData.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  IMDB
                </a>
              ) : null}
            </div>
          </div>
        </div>
      )}
      <h2>Also enters in</h2>
      <div className="personCreditMoviesWrapper">
        {movieCredits
          ? movieCredits.cast.map((credit) => (
              <MovieItem
                movie={credit}
                key={credit.id}
                poster_path={credit.poster_path}
                title={credit.title}
                id={credit.id}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default Person;
