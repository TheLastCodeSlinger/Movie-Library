import {useHistory} from "react-router-dom"

import "./Content.css"

import tmdbAPI from "../API/tmdbAPI"
import MovieItem from "./MovieItem"
import {NextPageButton, PrevPageButton} from "./NextPrefPageButton"




const Content = ({genreId, page, setMovies, setPage, genreName, movies}) => {

   // let history = useHistory();

    // Get the ID from clicked Genre/Discover and change buttons. Genre-Id's are numbers / Discover-Id's are strings (popular,upcoming,top_rated)
    let changePageForNextPageButton;
    let changePageForPrefPageButton;
    let changeUrlForNextPageButton;
    let changeUrlForPrefPageButton;
    

    if (isNaN(genreId) ) {
        changePageForNextPageButton = `/movie/${genreId}?api_key=${process.env.REACT_APP_API}&language=en-US&page=${(page + 1)}`
        changePageForPrefPageButton = `/movie/${genreId}?api_key=${process.env.REACT_APP_API}&language=en-US&page=${(page - 1)}`
        //Change displayed URL
        changeUrlForNextPageButton = `/Discover/${genreName}/Page=${page + 1}`;
        changeUrlForPrefPageButton = `/Discover/${genreName}/Page=${page - 1}`;
    } else {
        changePageForNextPageButton = `/discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&page=${(page + 1)}&with_genres=${genreId}`
        changePageForPrefPageButton = `/discover/movie?api_key=${process.env.REACT_APP_API}&language=en-US&page=${(page - 1)}&with_genres=${genreId}`
        //Change displayed URL
        changeUrlForNextPageButton = `/Genre/${genreName}/Page=${page + 1}`
        changeUrlForPrefPageButton = `/Genre/${genreName}/Page=${page - 1}`

    }
        
/*
    const nextPageHandler = () => {
        const fetchData = async () => { 
            const result = await tmdbAPI.get(changePageForNextPageButton);
                setMovies(result.data);
                
            };
                //history.push(changeUrlForNextPageButton)
                setPage(page + 1)
                fetchData();
                window.scrollTo(0,0);
                

    };

    const prefPageHandler = () => {
        const fetchData = async () => { 
            const result = await tmdbAPI.get(changePageForPrefPageButton);
                setMovies(result.data);
                setPage(page - 1);
            };
                //history.push(changeUrlForPrefPageButton)
                fetchData();
                window.scrollTo(0,0);
    };
    
*/

    return (
        <div className="container-main">
            <div className="content-header">
                <div className="content-direction" >{genreName ? genreName : "POPULAR"}</div>
                <div className="movie">Movies</div>
                {console.log("GenreId:" ,genreId, "Page", page)}
            </div>
            <div className="content-movies">
                {/* Rendering the Moives to the display */}
                {movies ? movies.results.map(movie => (
                    <MovieItem 
                        movie={movie} 
                        key={movie.id} 
                        poster_path={movie.poster_path} 
                        title={movie.title} 
                        id={movie.id} 
                    />
                )) : null}
            </div>
            <div className="pageNav">
                <NextPageButton 
                setMovies={setMovies} 
                setPage={setPage} 
                page={page} 
                loadNextContent={changePageForNextPageButton} 
                changeNextUrl={changeUrlForNextPageButton}
                genreId={genreId} />
                {/*<button className="nextPage" onClick={()=>nextPageHandler()} >{`Page ${(page + 1)}`}</button>*/}
                {/*page > 1 ? <button className="prefPage" onClick={() => prefPageHandler()} >{`Page ${(page - 1)}`}</button> : null*/}
                { page > 1 ? 
                <PrevPageButton 
                setMovies={setMovies} 
                setPage={setPage} 
                page={page} 
                loadPrevContent={changePageForPrefPageButton} 
                changePrevUrl={changeUrlForPrefPageButton} 
                genreId={genreId} />
                 : null}

            </div>
        </div>
    )
}

export default Content;