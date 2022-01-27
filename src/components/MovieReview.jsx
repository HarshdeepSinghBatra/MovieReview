import React from "react";
import Review from "./Review";
import AuthUserReview from "./AuthUserReview";
import ReviewForm from "./ReviewForm";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieReview = ({ movie_id, IsDetails, IsLogin }) => {
  const [ReviewList, setReviewList] = React.useState([]);
  const [UserReview, setUserReview] = React.useState([]);


  const postReview = async (reviewText, m_id, rating) => {

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;

    // const todayDate = new Date().toISOString().split("T")[0];
    const res = await axios.post("/api/home", {
      reviewText: reviewText,
      m_id: m_id,
      date: today,
      rating: rating
    }, {withCredentials: true});
    const data = res.data;
    // console.log(data);
    setUserReview([{
        review: reviewText,
        name: IsLogin ? JSON.parse(localStorage.getItem('authUser')).name : "test_name",
        m_id: m_id,
        date: today,
        rating: rating
      }]);
  };


  const updateReview = async (reviewText, m_id, rating, reviewDate) => {

    const res = await axios.patch("/api/home/updatereview", {
      reviewText: reviewText,
      m_id: m_id,
      rating: rating
    }, {withCredentials: true});
    const data = res.data;
    console.log(data);
    setUserReview([{
        review: reviewText,
        name: IsLogin ? JSON.parse(localStorage.getItem('authUser')).name : "test_name",
        m_id: m_id,
        date: reviewDate,
        rating: rating
      }]);
  };


  const getUserReview = async () => {
    try {
      const res = await axios.get("/api/home/userreview/" + movie_id, {withCredentials: true})
      const data = res.data;
      // console.log(data)
      setUserReview(data);
    } catch (err) {
      console.log(err.response)
    }
  }

  const getLoggedInReviews = async () => {
    try {
      const res = await axios.get("/api/home/loggedinreviews/" + movie_id, {withCredentials: true});
      const data = res.data;
      // console.log(data)
      setReviewList(data);
    } catch (err) {
      console.log(err.response)
    }
  }

  const getReviews = async () => {
    try {
      const res = await axios.get("/api/home/" + movie_id, {withCredentials: true});
      const data = res.data;
      // console.log(data)
      setReviewList(data);
    } catch (err) {
      console.log(err.response)
    }
  };

  const deleteReview = async () => {
    try {
      const res = await axios.delete("/api/home/deletereview/" + movie_id, {withCredentials: true})
      const data = res.data;
      console.log(data);
      setUserReview([]);
    } catch (err) {
      console.log(err.response)
    }
  }

  React.useEffect(() => {
    if (IsDetails) {
      if (IsLogin) {
        getLoggedInReviews();
        getUserReview();
      } else {
        getReviews();
      }
      
      
      
    } else {
      setReviewList([]);
    }
  }, [IsDetails]);

  return (
    <div className="movie-review">
      <h3>Reviews</h3>

      {!IsLogin ? <i>You need to be logged in to write a review <Link to="/login" className="review-link">Login Now</Link> </i> :
        UserReview.length > 0 ? <i>Your review has been submitted</i> : <ReviewForm postReview={postReview} movie_id={movie_id} IsDetails={IsDetails} />
      }
      
      <div className="reviews">
        {(UserReview.length > 0 && IsLogin)  && <AuthUserReview review={UserReview[0]} updateReview={updateReview} movie_id={movie_id} IsDetails={IsDetails} deleteReview={deleteReview} />}
        {ReviewList.length > 0
          ? ReviewList.map((review, index) => (
              <Review key={index} review={review} />
            ))
          : "No reviews"}
      </div>
    </div>
  );
};

export default MovieReview;
