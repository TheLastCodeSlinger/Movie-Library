import { Fragment } from 'react';
import {Link} from 'react-router-dom'

import {MdPlayArrow} from "react-icons/md";
import "./Css/SidebarItems.css"





export const SidebarRenderLinksDiscovery = () => {

    return (
        <Fragment>
            <Link className="sidebarItem"
                to={{
                    pathname: `/Discover/Popular/Page=1`,
                    state: { id: `popular` }
                    }}>
                <div className="sidebarIcon"><MdPlayArrow /></div>
                <div className="sidebarGenreTag">Popular</div>
            </Link>
            <Link className="sidebarItem"
                to={{
                    pathname: `/Discover/Top-Rated/Page=1`,
                    state: { id: `top_rated` }
                }}>
                <div className="sidebarIcon"><MdPlayArrow /></div>
                <div className="sidebarGenreTag">Top Rated</div>
            </Link>
            <Link className="sidebarItem"
                to={{
                    pathname: `/Discover/Upcoming/Page=1`,
                    state: { id: `upcoming` }
                }}>
                <div className="sidebarIcon"><MdPlayArrow /></div>
                <div className="sidebarGenreTag">Upcoming</div>
            </Link>
        </Fragment>
    )
}


export const SidebarRenderLinksGenre = (genre) => {

    return (
        <Link 
            className="sidebarItem" 
            to={{
                //Save genre-id in state. Id can be globally accessed with "const location= useLocation & const {id} = location.?id"
                pathname: `/Genre/${genre.genre.name}/Page=1`,
                state: {
                        id: genre.genre.id,
                        }
                    }}
                key={genre.genre.id} 
            >
                <div className="sidebarIcon"><MdPlayArrow /></div>
                <div className="sidebarGenreTag">{genre.genre.name}</div>
            </Link>
        )
    };
