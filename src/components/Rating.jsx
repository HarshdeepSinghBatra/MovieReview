import React from "react";

const Rating = ({ IsDetails, IsPosted, setStarRating, review }) => {
  const arr = [1, 1, 1, 1, 1];
  const [RatingVal, setRatingVal] = React.useState(review ? review.rating : 0);
  const [HoverRating, setHoverRating] = React.useState(0)

  React.useEffect(() => {
    if (!IsDetails) {
      setRatingVal(0);
    }
  }, [IsDetails])

  // React.useEffect(() => {
  //   if (!IsPosted) {
  //     setRatingVal(0);
  //   }
  // }, [IsPosted])

  React.useEffect(() => {
    setStarRating(RatingVal)
  }, [RatingVal])

  return (
    <ul className="rating">
      {arr.map((item, index) => {
        const IndexRating = index + 1;
        const currentRating = HoverRating || RatingVal;
        return (
          <li key={index} onMouseEnter={() => setHoverRating(IndexRating)}
            onMouseLeave={() => setHoverRating(0)}>
            <i
              className={
                IndexRating <= currentRating ? "fas fa-star" : "far fa-star"
              }
              onClick={() => {
                setRatingVal(IndexRating);
              }}
              
            ></i>
          </li>
        );
      })}
    </ul>
  );
};

export default Rating;
