import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./CardStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Card = ({ link, user, likes, imageId }) => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <div className="card-outer">
        <img className="card-img" src={link} alt="searchResult"></img>
        <div className="card-info">
          <h2 className="uploader">By {user}</h2>
          <button className="close-button" onClick={() => setModalActive(true)}>
            View Large
          </button>
        </div>
      </div>
      {modalActive && (
        <div className="image-modal">
          <img src={link} className="modal-img" alt=""></img>
          <button
            className="close-button"
            onClick={() => setModalActive(false)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Card;
