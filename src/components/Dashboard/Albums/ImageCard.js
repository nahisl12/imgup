import React from "react";
import "../../Cards/CardStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ImageCard = ({ link, author, imageId, imageStatus, imageFolder }) => {
  return (
    <div className="card-outer">
      <img className="card-img" src={link} alt="searchResult"></img>
      <div className="card-info">
        <h2 className="uploader">By {author}</h2>
        <h3 className="likes">
          {0} <FontAwesomeIcon icon={faHeart} className="faHeart" />
        </h3>
        <button className="link-button">
          <Link
            className="goto-image-link"
            to={`${imageId}`}
            state={{
              link: link,
              author: author,
              id: imageId,
              status: imageStatus,
              folder: imageFolder,
            }}
          >
            Go To Image
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ImageCard;
