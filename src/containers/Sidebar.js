import "./Css/Sidebar.css"
import "./Css/SidebarItems.css"

import Logo from "../components/Logo"
import {SidebarRenderLinksDiscovery, SidebarRenderLinksGenre} from './SidebarItems'




const Sidebar = ({setGenreId, page, genre}) => {

    return (
        <div className="sidebarWrapper">
            <Logo />

            <div className="sidebarItemsWrapper">
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
                    )};
            </div>
        </div>
        )
    }

export default Sidebar;