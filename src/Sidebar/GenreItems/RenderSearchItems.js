import { Fragment } from 'react';
import {Link} from 'react-router-dom'

import {MdPlayArrow} from "react-icons/md";
import "./SearchItems.css"



export const SidebarRenderDiscoverMovies = () => {
    return (
        <Fragment>
            <Link className="searchbarItem-container"
                to={{
                    pathname: `/Discover/Popular`,
                    state: { id: `popular` }
                    }}>
                <div className="eins"><MdPlayArrow /></div>
                <div className="zwei">Popular</div>
            </Link>
            <Link className="searchbarItem-container"
                to={{
                    pathname: `/Discover/Top-Rated`,
                    state: { id: `top_rated` }
                }}>
                <div className="eins"><MdPlayArrow /></div>
                <div className="zwei">Top Rated</div>
            </Link>
            <Link className="searchbarItem-container"
                to={{
                    pathname: `/Discover/Upcoming`,
                    state: { id: `upcoming` }
                }}>
                <div className="eins"><MdPlayArrow /></div>
                <div className="zwei">Upcoming</div>
            </Link>
        </Fragment>
    )
}


export const SidebarRenderGenre = (genre) => {
    return (
        <Link 
            className="searchbarItem-container" 
            to={{
                //Save genre-id in state. Id can be globally accessed with "const location= useLocation & const {id} = location.?id"
                pathname: `/Genre/${genre.genre.name}`,
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
