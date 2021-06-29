import { useEffect } from "react";

import tmdbAPI from "../../API/tmdbAPI";
import Content from "../../components/Movie/Content/Content";

const LandingPage = ({ ...props }) => {
  const { setMovies, setPage, setGenreName, setGenreId, genreId } = props;
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

  return <Content props={props} />;
};

export default LandingPage;
