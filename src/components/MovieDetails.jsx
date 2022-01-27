import axios from "axios";
import React from "react";
import DetailsButton from "./DetailsButton";
import MovieReview from "./MovieReview";
import img_not_found from "../images/img_not_found.jpg";
const MovieDetails = ({
  DetailsRef,
  IsDetails,
  toggleDetails,
  movie,
  IsLogin,
}) => {
  React.useEffect(() => {
    if (IsDetails) {
      document.body.style.overflow = "hidden";
      getCredits();
      getDetails();
    } else {
      document.body.style.overflow = "unset";
    }
  }, [IsDetails]);

  const [MovieDetails, setMovieDetails] = React.useState("");
  const [Genres, setGenres] = React.useState([]);

  const getDetails = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );
      const movie_details = res.data;
      setMovieDetails(movie_details);
    } catch (err) {
      return;
    }
  };

  const [Director, setDirector] = React.useState("");

  const getCredits = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      );
      const credits = res.data.crew;

      credits.forEach((credit) => {
        if (credit.job === "Director") {
          setDirector(credit.name);
        }
      });
    } catch (err) {
      return;
    }
  };

  const [BackgroundImg, setBackgroundImg] = React.useState("");
  const [PosterImg, setPosterImg] = React.useState("");
  const [Runtime, setRuntime] = React.useState("");

  React.useEffect(() => {
    if (MovieDetails) {
      let genres = [];
      MovieDetails.genres.forEach((genre) => genres.push(genre.name));
      setGenres(genres);
      setPosterImg(
        MovieDetails.poster_path
          ? `https://image.tmdb.org/t/p/w500${MovieDetails.poster_path}`
          : img_not_found
      );
      setBackgroundImg(
        MovieDetails.backdrop_path
          ? `https://image.tmdb.org/t/p/w1280${MovieDetails.backdrop_path}`
          : ''
      );
      setRuntime(MovieDetails.runtime);
    }
  }, [MovieDetails]);

  const hr = Math.floor(Runtime / 60);
  const min = Runtime - 60 * hr;
  const style = {
    background: `url(${BackgroundImg})`,
  };

  return (
    <div className="details-container" style={style} ref={DetailsRef}>
      <div className="movie-details">
        <i className="close fa-solid fa-xmark" onClick={toggleDetails}></i>
        <img src={PosterImg} alt="" />
        <div className="details">
          <div className="title-info-fav-wrapper">
            <div className="title-info-wrapper">
              <div className="details-title">{MovieDetails.original_title}</div>
              <div className="details-info">
                {MovieDetails.release_date} &nbsp; | {Genres.join(", ")} &nbsp;
                | &nbsp; {hr}h {min}m
              </div>
            </div>
            {/* {IsLogin && <DetailsButton /> }              */}
          </div>

          <h3>Overview</h3>
          <div className="overview"> {MovieDetails.overview} </div>
          <div className="credits">
            <h4>{Director}</h4>
            Director
          </div>
        </div>
      </div>
      <MovieReview
        movie_id={movie.id}
        IsDetails={IsDetails}
        IsLogin={IsLogin}
      />
    </div>
  );
};

export default MovieDetails;
