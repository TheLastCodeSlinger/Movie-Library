import {Link} from "react-router-dom";

import "./Button.css"

import tmdbAPI from '../../API/tmdbAPI'




const PreviousPageButton = ({setMovies, setPage, page, genreId, genreName}) => {

    let navigateToPreviousPage;
    let changeUrlToPreviousPage;

    //Genres have a Number as Id(2,22,322) whereas Discover has a String-Id (Popular/Top_rated)
    if (isNaN(genreId) ) {
        navigateToPreviousPage = `/movie/${genreId}?api_key=${process.env.REACT_APP_API}&language=en-US&page=${(page - 1)}`
        changeUrlToPreviousPage = `/Discover/${genreName}/Page=${page - 1}`;
    } else {
        navigateToPreviousPage = `/discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&page=${(page - 1)}&with_genres=${genreId}`
        changeUrlToPreviousPage = `/Genre/${genreName}/Page=${page - 1}`
    };


    const prevPageHandler = () => {
        const fetchData = async () => { 
            const result = await tmdbAPI.get(navigateToPreviousPage);
                setMovies(result.data);
                setPage(page - 1);
            };
                fetchData();
                window.scrollTo(0,0);
    };

    return (
        <Link 
            to={{
                pathname: `${changeUrlToPreviousPage}`,
                state: { id: genreId }
                }}
            className="prevPage"
        >
            <button className="button" onClick={prevPageHandler}>Last Page {page - 1}</button>
        </Link>
    )
};

export default PreviousPageButton;