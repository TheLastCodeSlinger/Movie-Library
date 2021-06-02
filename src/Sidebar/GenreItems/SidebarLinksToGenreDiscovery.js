import { Fragment } from 'react';
import {Link} from 'react-router-dom'

import {MdPlayArrow} from "react-icons/md";
import "./SearchItems.css"





export const SidebarRenderLinksDiscovery = () => {

    return (

        <Fragment>
            <Link className="searchbarItem-container"
                to={{
                    pathname: `/Discover/Popular/Page=1`,
                    state: { id: `popular` }
                    }}>
                <div className="eins"><MdPlayArrow /></div>
                <div className="zwei">Popular</div>
            </Link>
            <Link className="searchbarItem-container"
                to={{
                    pathname: `/Discover/Top-Rated/Page=1`,
                    state: { id: `top_rated` }
                }}>
                <div className="eins"><MdPlayArrow /></div>
                <div className="zwei">Top Rated</div>
            </Link>
            <Link className="searchbarItem-container"
                to={{
                    pathname: `/Discover/Upcoming/Page=1`,
                    state: { id: `upcoming` }
                }}>
                <div className="eins"><MdPlayArrow /></div>
                <div className="zwei">Upcoming</div>
            </Link>
        </Fragment>
    )
}


export const SidebarRenderLinksGenre = (genre) => {

    return (

        <Link 
            className="searchbarItem-container" 
            to={{
                //Save genre-id in state. Id can be globally accessed with "const location= useLocation & const {id} = location.?id"
                pathname: `/Genre/${genre.genre.name}/Page=1`,
                state: {
                        id: genre.genre.id,
                        }
                    }
                }
                key={genre.genre.id} 
        >
                <div className="eins"><MdPlayArrow /></div>
                <div className="zwei">{genre.genre.name}</div>
            </Link>
        )
    };
