import { Fragment } from 'react';

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import CastItem from './CastItem'



const Cast = (cast) => {

    //Map all Cast-Members-Profilepicture into the slide
    const items = cast.cast.cast.map(cast => (
        <CastItem cast={cast} key={cast.id} />
        )); 

        const settings = {
            dots: false,
            autoplay:true,
            autoplaySpeed: 2000,
            infinite: true,
            speed: 500,
            slidesToShow: 9,
            slidesToScroll: 1
          };

    return (
        <Fragment>
            <Slider {...settings}>{items}</Slider>
        </Fragment>
    );
};

export default Cast;