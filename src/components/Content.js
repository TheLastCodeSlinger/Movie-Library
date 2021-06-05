
import "./Css/Content.css"

import MovieItem from "./MovieItem"
import NextPageButton from './PageNavButtons/NextPageButton'
import PreviousPageButton from './PageNavButtons/LastPageButton'



const Content = ({genreId, page, setMovies, setPage, genreName, movies}) => {

    return (
        <div className="container-main">
            <div className="content-header">
                <div className="content-direction" >{genreName ? genreName : "POPULAR"}</div>
                <div className="movie">Movies</div>
            </div>
            <div className="content-movies">
                {/* Rendering the Moives to the display */}
                {movies ? movies.results.map(movie => (
                    <MovieItem 
                        movie={movie} 
                        key={movie.id} 
                        poster_path={movie.poster_path} 
                        title={movie.title} 
                        id={movie.id} />
                        )
                    ) : null}
            </div>
            <div className="pageNavigation-container">
                <NextPageButton 
                    setMovies={setMovies} 
                    setPage={setPage} 
                    page={page} 
                    genreId={genreId}
                    genreName={genreName} />
                { page > 1 ? 
                    <PreviousPageButton 
                    setMovies={setMovies} 
                    setPage={setPage} 
                    page={page} 
                    genreId={genreId}
                    genreName={genreName} />
                : null}
            </div>
        </div>
    )
}

export default Content;