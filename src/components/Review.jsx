import React from "react";
import ReviewRating from "./ReviewRating";

const Review = ({ review }) => {
  return (
    <div className="review">
      <h4>
        {review.name} <span>{review.date}</span>
      </h4>
      <ReviewRating review={review} />
      <p>{review.review}</p>
    </div>
  );
};

export default Review;
