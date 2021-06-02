import {Link, useHistory, useParams} from "react-router-dom";

import "./NextPrefPageButton.css"

import tmdbAPI from '../API/tmdbAPI'


export const NextPageButton = ({setMovies, setPage, page, loadNextContent, changeNextUrl, genreId}) => {
    const historry = useHistory()
    
    const nextPageHandler = () => {
        const fetchData = async () => { 
            const result = await tmdbAPI.get(loadNextContent);
                setMovies(result.data);
            };
                //history.push(changeUrlForNextPageButton)
                setPage(page + 1)
                fetchData();
                window.scrollTo(0,0);
            };

            console.log("from nextpagebutton", page);

    return (
        <Link to={{
            pathname: `${changeNextUrl}`,
            state: { id: genreId }
            }}
            >
            {console.log(historry.location, "me from button")}
            <button className="nextPage" onClick={nextPageHandler}>Next Page</button>
        </Link>
    )
};

export const PrevPageButton = ({setMovies, setPage, page, loadPrevContent, changePrevUrl, genreId}) => {
    const historry = useHistory()

    const prevPageHandler = () => {
        const fetchData = async () => { 
            const result = await tmdbAPI.get(loadPrevContent);
                setMovies(result.data);
                setPage(page - 1);
            };
                //history.push(changeUrlForPrefPageButton)
                fetchData();
                window.scrollTo(0,0);
    };

    console.log("from prevpagebutton", page);

    return (
        <Link to={{
            pathname: `${changePrevUrl}`,
            state: { id: genreId }
            }}
        >
            {console.log(historry.location, "me from button")}
            <button className="prevPage" onClick={prevPageHandler}>Last Page</button>
        </Link>
    )
};