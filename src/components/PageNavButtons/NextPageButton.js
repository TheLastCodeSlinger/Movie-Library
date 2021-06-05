import {Link} from "react-router-dom";

import "./Button.css"

import tmdbAPI from '../../API/tmdbAPI'





const NextPageButton = ({setMovies, setPage, page, genreId, genreName}) => {

    let navigateToNextPage;
    let changeUrlToNextPage;

    //Genres have a Number as Id(2,22,322) whereas Discover has a String-Id (Popular/Top_rated)
    if (isNaN(genreId) ) {
        navigateToNextPage = `/movie/${genreId}?api_key=${process.env.REACT_APP_API}&language=en-US&page=${(page + 1)}`
        changeUrlToNextPage = `/Discover/${genreName}/Page=${page + 1}`;
    } else {
        navigateToNextPage = `/discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&page=${(page + 1)}&with_genres=${genreId}`
        changeUrlToNextPage = `/Genre/${genreName}/Page=${page + 1}`

    };
    
    const nextPageHandler = () => {
        const fetchData = async () => { 
            const result = await tmdbAPI.get(navigateToNextPage);
                setMovies(result.data);
            };
                setPage(page + 1)
                fetchData();
                window.scrollTo(0,0);
    };

    return (
        <Link 
            to={{
                pathname: `${changeUrlToNextPage}`,
                state: { id: genreId }
                }}
                className="nextPage"
        >
            <button className="button" onClick={nextPageHandler}>Next Page {page + 1}</button>
        </Link>
    )
};

export default NextPageButton;