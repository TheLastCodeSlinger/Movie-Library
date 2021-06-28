import { useEffect } from "react";

import tmdbAPI from "../../API/tmdbAPI";
import Content from "../../components/Movie/Content/Content";

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
  //Fetch Discover/Popular page and render it.
  useEffect(() => {
    const fetchPopularPageOneData = async () => {
      const result = await tmdbAPI.get(`/movie/popular`, {
        params: {
          language: "en-US",
          page: 1,
        },
      });
      setMovies(result.data);
      setGenreName("Popular");
      setGenreId("popular");
      setPage(1);
    };
    fetchPopularPageOneData();
  }, [genreId, setMovies, setGenreId, setGenreName, setPage]);

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
