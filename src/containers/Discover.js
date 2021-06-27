import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import tmdbAPI from "../API/tmdbAPI";
import Content from "../components/Content";

const RenderDiscover = ({
  setMovies,
  setPage,
  setGenreName,
  setGenreId,
  genreId,
  movies,
  page,
  genreName,
}) => {
  //Get State from clicked <Link/>
  const location = useLocation();
  //const match = useRouteMatch();
  const id = location.state?.id;
  const { discName } = useParams();

  //Fetch the Discover-List> setMovies to this List > Rerender & Display Discover/XXX
  useEffect(() => {
    const fetchClickedGenreData = async () => {
      const result = await tmdbAPI.get(`/movie/${id}`, {
        params: {
          language: "en-US",
          page: page,
        },
      });
      setMovies(result.data);
      setGenreId(id);
    };
    //Safety - only fetch new Discovery/setPage if a new link is clicked.. Compares the genreId(which is saved in a State) with the clicked Link(passes id as state). prevents unwanted resets,
    if (genreId !== id) {
      fetchClickedGenreData();
      setGenreName(discName);
      setPage(1);
      scroll.scrollToTop({
        smooth: true,
        delay: 600,
        offSet: 100,
      });
    }
  }, [discName, page, setGenreId, setMovies, setPage, setGenreName]);

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

export default RenderDiscover;
