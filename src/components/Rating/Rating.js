import "../Movie/MovieItem/MovieItems.css";

import Stars from "react-rating";

import { FullRatingIcon, RatingIcon } from "../IconsAsComponent/IconsAsComponent";

const Rating = ({ number }) => {
  return (
    <div className="ratingwrapper">
      <Stars
        className="stars"
        emptySymbol={<RatingIcon />}
        fullSymbol={<FullRatingIcon />}
        fractions={5}
        initialRating={number}
        readonly
      />
      {number.toFixed(1) + " / 5"}
    </div>
  );
};

export default Rating;
