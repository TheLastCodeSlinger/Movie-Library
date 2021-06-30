import { useEffect } from "react";

import tmdbAPI from "../../API/tmdbAPI";
import Content from "../../components/Movie/Content/Content";

const LandingPage = ({ ...props }) => {
  const { setMovies, setPage, setGenreName, setGenreId, genreId } = props;
  //Fetch Discover/Popular page and render it.
  useEffect(() => {
    const fetchPopularPageOneData = async () => {
      await tmdbAPI
        .get(`/movie/popular`, {
          params: {
            language: "en-US",
            page: 1,
          },
        })
        .then((response) => {
          setMovies(response.data);
          setGenreName("Popular");
          setGenreId("popular");
          setPage(1);
        })
        .catch((err) => alert(`Error: ${err.response.data.status_message}`));
    };
    fetchPopularPageOneData();
  }, [genreId, setMovies, setGenreId, setGenreName, setPage]);

  return <Content props={props} />;
};

export default LandingPage;
