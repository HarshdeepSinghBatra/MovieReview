import React from "react";
import Rating from "./Rating";

const ReviewForm = ({ postReview, movie_id, IsDetails }) => {
  const [ReviewText, setReviewText] = React.useState("");
  const [IsPosted, setIsPosted] = React.useState(false);
  const [rating, setRating] = React.useState(0)
  const setStarRating = (RatingVal) => {
    setRating(RatingVal)
  }

  const submitReview = (e) => {
    e.preventDefault();
    postReview(ReviewText, movie_id, rating);
    setIsPosted(true);
  };

  React.useEffect(() => {
    if (IsPosted) {
      setReviewText("");
      setRating(0);
      setIsPosted(false);
    }
  }, [IsPosted]);

  React.useEffect(() => {
    if (!IsDetails) {
      setReviewText("");
      setRating(0);
    }
  }, [IsDetails])

  return (    
    <form action="#" className='review-form' onSubmit={submitReview}>
      <div className="form-rating">
        <label>Rate this movie</label>
        <Rating IsDetails={IsDetails} IsPosted={IsPosted} setStarRating={setStarRating} />
      </div>
      {/* <input
        type="text"
        value={ReviewText}
        placeholder="Write review"
        onChange={(e) => setReviewText(e.target.value)}
      /> */}
      <div className="input-wrapper">
        <textarea placeholder="Write review..." value={ReviewText} onChange={(e) => setReviewText(e.target.value)}></textarea>
        <button type="submit">Submit</button>
      </div>

    </form>
  );
};

export default ReviewForm;
