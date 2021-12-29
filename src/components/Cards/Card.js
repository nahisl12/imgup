import React, { useState } from "react";
import "./CardStyle.css";
import Modal from "../Modal/Modal";

const Card = ({ link, user }) => {
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
      {modalActive && <Modal type="image" link={link} setModalActive={setModalActive} />}
    </>
  );
};

export default Card;
