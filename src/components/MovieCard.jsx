import React from "react";
import MovieDetails from "./MovieDetails";
import img_not_found from "../images/img_not_found.jpg";

const MovieCard = ({ movie, IsLogin, lastMovieElement }) => {
  const [IsDetails, toggleIsDetails] = React.useState(false);
  const DetailsRef = React.useRef(null);
  const toggleDetails = () => {
    toggleIsDetails(!IsDetails);
  };

  React.useEffect(() => {
    if (IsDetails === false) {
      DetailsRef.current.style.display = "none";
    } else {
      DetailsRef.current.style.display = "flex";
    }
  }, [IsDetails]);

  return (
    <>
      <div className="movie-card" onClick={toggleDetails} ref={lastMovieElement}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : img_not_found
          }
          alt={movie.original_title}
          className="movie-img"
        />
        <div className="movie-title"> {movie.original_title} </div>
        <div className="movie-date"> {movie.release_date} </div>
      </div>
      <MovieDetails
        DetailsRef={DetailsRef}
        IsDetails={IsDetails}
        toggleDetails={toggleDetails}
        movie={movie}
        IsLogin={IsLogin}
      />
    </>
  );
};

export default MovieCard;
