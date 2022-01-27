import React from "react";

const ReviewRating = ({ review }) => {
  const arr = [1, 1, 1, 1, 1];
  const UserRating = review.rating;

  return (
    <ul className="review-rating">
      {arr.map((item, index) => {
        return (
          <li key={index}>
            <i
              className={`${index + 1 <= UserRating ? "fas" : "far"} fa-star `}
            ></i>
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewRating;
