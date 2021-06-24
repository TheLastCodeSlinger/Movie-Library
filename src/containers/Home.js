import { useEffect } from "react";

import tmdbAPI from "../API/tmdbAPI";
import Content from "../components/Content";

const LandingPage = ({
  setMovies,
  setPage,
  setGenreName,
  setGenreId,
  movies,
  page,
  genreId,
  genreName,
}) => {
  //Fetch Discover/Popular page and render it
  useEffect(() => {
    const fetchPopularPageOneData = async () => {
      const result = await tmdbAPI.get(
        `/movie/popular?api_key=${process.env.REACT_APP_API}&language=en-US&page=1`
      );
      setMovies(result.data);
      setGenreName("Popular");
      setGenreId("popular");
      setPage(1);
    };
    fetchPopularPageOneData();
  }, [genreId]);

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
  );
};

export default LandingPage;
