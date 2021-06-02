import "./SidebarUi.css"

import Logo from "./Logo/Logo"
import SidebarLinkContainer from "./GenreItems/SidebarLinkContainer"





const SidebarUi = ({setPage, setMovies, movies, setGenreId, setGenreName, page, genreName, genre}) => {

    return (
        
    <div className="sidebar">
        <Logo />
        <SidebarLinkContainer 
            setPage={setPage} 
            setMovies={setMovies} 
            movies={movies} 
            setGenreId={setGenreId} 
            setGenreName={setGenreName} 
            page={page} 
            genreName={genreName} 
            genre={genre} 
        />
    </div>
    )
}

export default SidebarUi;