import { useLocation, useParams, useRouteMatch} from "react-router-dom";
import { useEffect} from "react"
import {animateScroll as scroll} from 'react-scroll'

import Content from '../components/Content'
import tmdbAPI from '../API/tmdbAPI';







const RenderDiscover = ({ setMovies, setPage, setGenreName, setGenreId, genreId, movies, page, genreName}) => {
    //Get State from clicked <Link/>
    const location = useLocation();
    const match = useRouteMatch()
    const id = location.state?.id;
    const {discName} = useParams();
 

    
    //Fetch the Discover-List> setMovies to this List > Rerender & Display Discover/XXX
    useEffect(() => {
        const fetchClickedGenreData = async() => {
            const result = await tmdbAPI.get(`/movie/${id}`, {
                params: {
                    language: 'en-US',
                    page: page
                },
            });
                setMovies(result.data);
                setGenreId(id);
            };
            console.log("From Discover",  match.params.discName );
            //Safety - only fetch new Discovery/setPage if a new link is clicked.. Compares the genreId(which is saved in a State) with the clicked Link(passes id as state). prevents unwanted resets,
            if(genreId !== id){
                fetchClickedGenreData();
                setGenreName(discName);
                setPage(1);
                scroll.scrollToTop({
                    smooth: true,
                    delay: 600,
                    offSet: 100
                });
            }
        },[discName, page])


    return (
        <Content 
            movies={movies} 
            setMovies={setMovies} 
            page={page} 
            setPage={setPage} 
            genreId={genreId} 
            setGenreId={setGenreId} 
            genreName={genreName} 
        />
        )
    }

export default RenderDiscover;