import React from "react";

const DetailsButton = () => {

  const [IsFavorite, toggleIsFavorite] = React.useState(false);

  return (
    <button className="details-btn" onClick={() => toggleIsFavorite(!IsFavorite)}>
      <i className={IsFavorite ? "fas fa-heart" : "far fa-heart"} title="Favorite"></i>
    </button>
  );
};

export default DetailsButton;
