import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";

import "./Button.css";

import tmdbAPI from "../../API/tmdbAPI";

const NextPageButton = ({ setMovies, setPage, page, genreId, genreName }) => {
  let navigateToNextPage;
  let changeUrlToNextPage;
  let params = {};

  //Genres have a Number as Id(2,22,322) whereas Discover has a String-Id (Popular/Top_rated)
  if (isNaN(genreId)) {
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
      },
    };
  }

  const nextPageHandler = () => {
    const fetchData = async () => {
      const result = await tmdbAPI.get(navigateToNextPage, params);
      setMovies(result.data);
      console.log("nextpage resukt:", page);
    };
    setPage(page + 1);
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
