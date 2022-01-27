import React from "react";
import ReviewRating from "./ReviewRating";
import UpdateReviewForm from "./UpdateReviewForm";

const AuthUserReview = ({ review, updateReview, movie_id, IsDetails, deleteReview }) => {

  const [ReviewSettings, toggleReviewSettings] = React.useState(false)

  const [ReviewList, toggleReviewList] = React.useState(false)

  const [IsUpdateReview, toggleIsUpdateReview] = React.useState(false)

  const mouseLeave = () => {
    toggleReviewSettings(false)
    toggleReviewList(false)
  }

  const toggleUpdateReview = () => {
    toggleIsUpdateReview(true)
  }

  return (
    <>
    {
      IsUpdateReview ? <UpdateReviewForm updateReview={updateReview} movie_id={movie_id} IsDetails={IsDetails} review={review} toggleIsUpdateReview={toggleIsUpdateReview} /> : 
      <div className="review user-review" onMouseEnter={() => toggleReviewSettings(true)} onMouseLeave={mouseLeave} >
        {ReviewSettings && <i className="review-settings fas fa-ellipsis-v" onClick={() => toggleReviewList(!ReviewList)} ></i>} 
        {ReviewList && <ul className='review-list'>
          <li onClick={toggleUpdateReview} >Edit</li>
          <li onClick={deleteReview} >Delete</li>
        </ul>}
        <h4>
          {review.name} <span>{review.date}</span>
        </h4>
        <ReviewRating review={review} />
        <p>{review.review}</p>
      </div>
    }
    </>
  );
};

export default AuthUserReview;
