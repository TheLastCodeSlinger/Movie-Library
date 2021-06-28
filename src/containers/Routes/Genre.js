import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import tmdbAPI from "../../API/tmdbAPI";
import Content from "../../components/Movie/Content/Content";
import SortBy from "../../components/SortBy/Sortby";

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
  const { genName } = useParams();
  const [option, setOption] = useState({
    value: "popularity.desc",
    label: "Popularity",
  });
  

  //Fetch the Genre-List > setMovies to this List > Rerender & Display Genre-Page1
  useEffect(() => {
    const fetchClickedCategoryData = async () => {
      const result = await tmdbAPI.get(`/discover/movie`, {
        params: {
          language: "en-US",
          page: page,
          with_genres: id,
          sort_by: option.value,
        },
      });
      setMovies(result.data);
      setGenreId(id);
    };
    //check if still in same genre . Yes = nothing happens. Else = execude code+rerender.
    if (genreId !== id || option.value) {
      fetchClickedCategoryData();
      setPage(1);
      setGenreName(genName);
      scroll.scrollToTop({
        smooth: true,
        duration: 600,
        offSet: 100,
      });
    }
  }, [id, page, option.value, setMovies, setGenreName, setGenreId, setPage]);

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <SortBy option={option} setOption={setOption} />
      <Content
        movies={movies}
        setMovies={setMovies}
        page={page}
        setPage={setPage}
        genreId={genreId}
        setGenreId={setGenreId}
        genreName={genreName}
      />
    </div>
  );
};

export default RenderGenre;
