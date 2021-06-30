import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import tmdbAPI from "../../API/tmdbAPI";
import Content from "../../components/Movie/Content/Content";

const RenderDiscover = ({ ...props }) => {
  const { setMovies, setPage, setGenreName, setGenreId, genreId, page } = props;
  //Get State from clicked <Link/>
  const location = useLocation();
  const id = location.state?.id;
  const { discName } = useParams();
  //const match = useRouteMatch(); Could get the params with match, but decided to do it this way

  //Fetch the Discover-List> setMovies to this List > Rerender & Display Discover/XXX
  useEffect(() => {
    const fetchClickedGenreData = async () => {
      await tmdbAPI
        .get(`/movie/${id}`, {
          params: {
            language: "en-US",
            page: page,
          },
        })
        .then((response) => {
          setMovies(response.data);
          setGenreId(id);
        })
        .catch((err) => alert(`Error: ${err.response.data.status_message}`));
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
  }, [
    genreId,
    id,
    discName,
    page,
    setGenreId,
    setMovies,
    setPage,
    setGenreName,
  ]);

  return <Content props={props} />;
};

export default RenderDiscover;
