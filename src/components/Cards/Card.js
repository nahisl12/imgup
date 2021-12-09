import React from "react";
import "./CardStyle.css";

const Card = ({ link }) => {
  return (
    <div className="card-outer">
      <img className="card-img" src={link} alt="searchResult"></img>
    </div>
  );
};

export default Card;
