import "./SidebarUi.css"
import Logo from "./Logo/Logo"
import SearchItems from "./GenreItems/SearchItems"

const SidebarUi = ({setPage, setMovies, movies, setId, setGenreName, page, genreName, genre}) => {
    return (
    <div className="sidebar">
        <Logo />
        <SearchItems 
            setPage={setPage} 
            setMovies={setMovies} 
            movies={movies} 
            setId={setId} 
            setGenreName={setGenreName} 
            page={page} 
            genreName={genreName} 
            genre={genre} 
        />
    </div>
    )
}

export default SidebarUi;