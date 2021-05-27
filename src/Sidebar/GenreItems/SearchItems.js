
import "./SearchItems.css"

import {SidebarRenderDiscoverMovies, SidebarRenderGenre} from './RenderSearchItems'



const SearchItems = ({page, genre}) => {
    return (
        <div className="searchbarItems">
            <h2>DISCOVER</h2>
                { genre !== 0 ? <SidebarRenderDiscoverMovies page={page} /> : null}
                
            <h2>GENRE</h2>
                {genre !== 0 ? genre.genres.map(genre => (
                    <SidebarRenderGenre page={page} genre={genre} key={genre.id} />
                 )) : null}
        </div>
    )
}

export default SearchItems;