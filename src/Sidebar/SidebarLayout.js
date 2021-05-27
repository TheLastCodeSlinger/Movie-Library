import "./SidebarLayout.css"
import Logo from "./Logo/Logo"
import SearchItems from "./GenreItems/SearchItems"

const Sidebar = ({setPage, setMovies, movies, setId, setGenreName, page, genreName}) => {
    return (
    <div className="sidebar">
        <Logo />
        <SearchItems setPage={setPage} setMovies={setMovies} movies={movies} setId={setId} setGenreName={setGenreName} page={page} genreName={genreName} />
    </div>
    )}

export default Sidebar;