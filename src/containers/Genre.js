import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

import tmdbAPI from "../API/tmdbAPI";
import Content from "../components/Content";

const RenderGenre = ({
  setMovies,
  setPage,
  setGenreId,
  setGenreName,
  page,
  genreName,
  movies,
  genreId,
}) => {
  //Get Genre-Id from clicked <Link/>
  const location = useLocation();
  const id = location.state?.id;
  //Genname = action/drama/animation etc.
  const { genName } = useParams();

  //const match = useRouteMatch("/Genre/:discName/Page=:id")

  //Fetch the Genre-List > setMovies to this List > Rerender & Display Genre-Page1
  useEffect(() => {
    const fetchClickedCategoryData = async () => {
      const result = await tmdbAPI.get(`/discover/movie`, {
        params: {
          language: "en-US",
          page: page,
          with_genres: id,
        },
      });
      setMovies(result.data);
      setGenreId(id);
    };
    //check if still in same genre . Yes = nothing happens.
    if (genreId !== id) {
      fetchClickedCategoryData();
      setPage(1);
      setGenreName(genName);
      scroll.scrollToTop({
        smooth: true,
        duration: 600,
        offSet: 100,
      });
    }
  }, [id, page]);

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

export default RenderGenre;
