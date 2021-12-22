import React from "react";
import "../Cards/CardStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ImageCard = ({ link, author }) => {
  return (
    <div className="card-outer">
      <img className="card-img" src={link} alt="searchResult"></img>
      <div className="card-info">
        <h2 className="uploader">By {author}</h2>
        <h3 className="likes">
          {0} <FontAwesomeIcon icon={faHeart} className="faHeart" />
        </h3>
      </div>
    </div>
  );
};

export default ImageCard;
