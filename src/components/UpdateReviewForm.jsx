import React from 'react'
import Rating from "./Rating";

const UpdateReviewForm = ({ updateReview, movie_id, IsDetails, review, toggleIsUpdateReview }) => {

    const [ReviewText, setReviewText] = React.useState(review.review);
    const [ReviewDate, setReviewDate] = React.useState(review.date);
    const [IsPosted, setIsPosted] = React.useState(false);
    const [rating, setRating] = React.useState(0)

    const setStarRating = (RatingVal) => {
        setRating(RatingVal)
    }

    const submitReview = (e) => {
        e.preventDefault();
        updateReview(ReviewText, movie_id, rating, ReviewDate);
        setIsPosted(true);
        toggleIsUpdateReview(false)
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
            <Rating IsDetails={IsDetails} IsPosted={IsPosted} review={review} setStarRating={setStarRating} />
        </div>
        {/* <input
            type="text"
            value={ReviewText}
            placeholder="Edit review"
            onChange={(e) => setReviewText(e.target.value)}
        /> */}
        <div className="input-wrapper">
          <textarea placeholder="Write review..." onChange={(e) => setReviewText(e.target.value)} value={ReviewText} ></textarea>
          <button type="button" onClick={() => toggleIsUpdateReview(false)} className= "cancel-update-btn" >Cancel</button>
          <button type="submit">Submit</button>          
        </div>

        </form>
    )
}

export default UpdateReviewForm
