import React from "react";

const Card = ({ searchResult, imageLink }) => {
  return (
    <div>
      <img src={imageLink} alt="searchResult"></img>
    </div>
  );
};

export default Card;
