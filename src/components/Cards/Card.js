import React from "react";
import "./CardStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Card = ({ link, user, likes }) => {
  return (
    <div className="card-outer">
      <img className="card-img" src={link} alt="searchResult"></img>
      <div className="card-info">
        <h2 className="uploader">By {user}</h2>
        <h3 className="likes">
          {likes} <FontAwesomeIcon icon={faHeart} className="faHeart" />
        </h3>
      </div>
    </div>
  );
};

export default Card;
