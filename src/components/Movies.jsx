import React from "react";
import MovieCard from "./MovieCard";

const Movies = ({ movieslist, IsLogin, lastMovieElement }) => {
  return (
    <div className="movies-wrapper">
      <div className="movies-container">
        {movieslist.map((movie, index) => {
          if (movieslist.length === index + 1) {
            return <MovieCard lastMovieElement={lastMovieElement} key={index} movie={movie} IsLogin={IsLogin} />            
          } else {
            return <MovieCard key={index} movie={movie} IsLogin={IsLogin} />
          }
          
        })}
      </div>
    </div>
  );
};

export default Movies;
