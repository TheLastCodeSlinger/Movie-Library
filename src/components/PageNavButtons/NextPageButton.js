import "./Button.css";

import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import tmdbAPI from "../../API/tmdbAPI";

const NextPageButton = ({ props, option }) => {
  const { setPage, setMovies, page, genreId, genreName } = props;
  let navigateToNextPage;
  let changeUrlToNextPage;
  let params = {};

  const nextPageHandler = () => {
    const fetchData = async () => {
      await tmdbAPI
        .get(navigateToNextPage, params)
        .then((response) => {
          setMovies(response.data);
        })
        .catch((err) => alert(`Error: ${err.response.data.status_message}`));
    };
    setPage(page + 1);
    fetchData();
    scroll.scrollToTop({
      smooth: true,
      duration: 600,
      offSet: 100,
    });
  };
  //Genres have a Number as Id(2,22,322) whereas Discover has a String-Id (Popular/Top_rated). "query" is hardcoded in Search.js specially for this check
  if (genreId === "query") {
    navigateToNextPage = `/search/movie`;
    changeUrlToNextPage = `/search/${genreName}/page=${page + 1}`;
    params = {
      params: {
        language: "en-US",
        page: page + 1,
        query: genreName,
      },
    };
  } else if (isNaN(genreId) && genreId !== "query") {
    changeUrlToNextPage = `/Discover/${genreName}?page=${page + 1}`;
    navigateToNextPage = `/movie/${genreId}`;
    params = {
      params: {
        language: "en-US",
        page: page + 1,
      },
    };
  } else {
    changeUrlToNextPage = `/Genre/${genreName}?page=${page + 1}`;
    navigateToNextPage = `/discover/movie`;
    params = {
      params: {
        language: "en-US",
        page: page + 1,
        with_genres: genreId,
        sort_by: option.value,
      },
    };
  }

  return (
    <Link
      to={{
        pathname: `${changeUrlToNextPage}`,
        state: { id: genreId },
      }}
      className="nextPage"
    >
      <button className="button" onClick={nextPageHandler}>
        Next Page {page + 1}
      </button>
    </Link>
  );
};

export default NextPageButton;
