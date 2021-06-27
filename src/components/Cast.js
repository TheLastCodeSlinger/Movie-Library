import Slider from "react-slick";

import CastItem from "./CastItem";
import "./Css/CastItem.css";
import "./Css/App.scss";

const Cast = (cast) => {
  //Map all Cast-Members-Profilepicture into the slide
  const items = cast.cast.cast.map((cast) => (
    <CastItem cast={cast} key={cast.id} />
  ));

  let changeDisplayedSlides = 9;
  if (cast.isMobile) {
    changeDisplayedSlides = 5;
  }

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: changeDisplayedSlides,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  // Slider needs container-wrap, to set width & overflow, else the Slider doesn't work properly. Without, it won't resize.
  return (
    <div className="container-wrap">
      <Slider {...settings}>{items}</Slider>
    </div>
  );
};

export default Cast;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "gray" }}
      onClick={onClick}
    />
  );
}