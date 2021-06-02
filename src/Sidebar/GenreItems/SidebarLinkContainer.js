
import "./SearchItems.css"

import {SidebarRenderLinksDiscovery, SidebarRenderLinksGenre} from './SidebarLinksToGenreDiscovery'





const SidebarLinkContainer = ({page, genre, setGenreId}) => {

    return (
        
        <div className="searchbarItems">
            <h2>DISCOVER</h2>
                { genre && <SidebarRenderLinksDiscovery
                page={page}
                setGenreId={setGenreId} /> 
                }
                
            <h2>GENRE</h2>
                {genre && genre.genres.map(genre => (
                    <SidebarRenderLinksGenre 
                    page={page} 
                    genre={genre} 
                    key={genre.id}
                    setGenreId={setGenreId} />
                    )
                ) 
                }
        </div>
    )
}

export default SidebarLinkContainer;