import React from "react";
import "../../Cards/CardStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// what to do next with this section of site
// on clicking the image card, enlarge the picture and have two drop down options.
// one drop-down for moving image to other folder <-- will need to retrieve data of user folders to populate this
// second drop-down for change image status either public/private <-- image data needed for this
// button to confirm changes and make put request <-- will require user token
// Delete button to remove image

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
