import "./Button.css";

import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import tmdbAPI from "../../API/tmdbAPI";

const PreviousPageButton = ({ props, option }) => {
  const { setMovies, setPage, page, genreName, genreId } = props;
  let navigateToPreviousPage;
  let changeUrlToPreviousPage;
  let params;
  console.log(props, "propss", "OPTION!=!=!=!=!", option);
  //Genres have a Number as Id(2,22,322) whereas Discover has a String-Id (Popular/Top_rated). "query" is hardcoded in Search.js specially for this check
  if (genreId === "query") {
    navigateToPreviousPage = `/search/movie`;
    changeUrlToPreviousPage = `/search/${genreName}/page=${page - 1}`;
    params = {
      params: {
        language: "en-US",
        page: page - 1,
        query: genreName,
      },
    };
  } else if (isNaN(genreId)) {
    navigateToPreviousPage = `/movie/${genreId}`;
    changeUrlToPreviousPage = `/Discover/${genreName}?page=${page - 1}`;
    params = {
      params: {
        language: "en-US",
        page: page - 1,
      },
    };
  } else {
    navigateToPreviousPage = `/discover/movie`;
    changeUrlToPreviousPage = `/Genre/${genreName}?page=${page - 1}`;
    params = {
      params: {
        language: "en-US",
        page: page - 1,
        with_genres: genreId,
        sort_by: option.value,
      },
    };
  }

  const prevPageHandler = () => {
    const fetchData = async () => {
      await tmdbAPI
        .get(navigateToPreviousPage, params)
        .then((response) => {
          setMovies(response.data);
          setPage(page - 1);
        })
        .catch((err) => alert(`Error: ${err.response.data.status_message}`));
    };
    fetchData();
    scroll.scrollToTop({
      smooth: true,
      duration: 600,
      offSet: 100,
    });
  };

  return (
    <Link
      to={{
        pathname: `${changeUrlToPreviousPage}`,
        state: { id: genreId },
      }}
      className="prevPage"
    >
      <button className="button" onClick={prevPageHandler}>
        Last Page {page - 1}
      </button>
    </Link>
  );
};

export default PreviousPageButton;
