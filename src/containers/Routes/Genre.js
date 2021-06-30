import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import tmdbAPI from "../../API/tmdbAPI";
import Content from "../../components/Movie/Content/Content";
import SortBy from "../../components/SortBy/Sortby";

const RenderGenre = ({ ...props }) => {
  const {
    setMovies,
    setPage,
    setGenreId,
    setGenreName,
    page,
    genreId,
    history,
    genreName,
  } = props;
  //Get Genre-Id from clicked <Link/>
  const location = useLocation();
  const id = location.state?.id;
  const { genName } = useParams();
  const [option, setOption] = useState({
    value: "popularity.desc",
    label: "Popularity",
  });
  // prevOptionRev will be an object. In the useEffect i assign {key:current value: beforeChangeOption }. The prevOption stores this key/value. The if-check in the useEffect checks whether a new option has been chosen and rerenders if true.
  const prevOptionRef = useRef();
  const prevOption = prevOptionRef.current;

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
  }, [
    prevOptionRef,
    prevOption,
    genName,
    genreId,
    id,
    page,
    option.value,
    setMovies,
    setGenreName,
    setGenreId,
    setPage,
  ]);

  useEffect(() => {
    prevOptionRef.current = option.value;
    const fetchClickedCategoryData = async () => {
      await tmdbAPI
        .get(`/discover/movie`, {
          params: {
            language: "en-US",
            page: 1,
            with_genres: id,
            sort_by: option.value,
          },
        })
        .then((response) => {
          setMovies(response.data);
          setGenreId(id);
        })
        .catch((err) => alert(`Error: ${err.response.data.status_message}`));
    };

    if (option.value !== prevOption) {
      setPage(1);
      fetchClickedCategoryData();
      history.replace(`/Genre/${genreName}?page=1`);
    }
  }, [
    prevOptionRef,
    prevOption,
    option.value,
    id,
    setGenreId,
    setMovies,
    setPage,
    genreName,
    history,
  ]);

  return (
    <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
      <SortBy option={option} setOption={setOption} />
      <Content props={props} option={option} />
    </div>
  );
};

export default RenderGenre;
