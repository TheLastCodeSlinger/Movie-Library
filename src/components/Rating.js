import Stars from "react-rating";
import { RatingIcon, FullRatingIcon } from "./Logo";
import "./Css/MovieItems.css";

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
