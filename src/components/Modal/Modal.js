import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ type, link, setModalActive, confirmAction, message }) => {
  const [modalType] = useState(type);

  return modalType === "image" ? (
    <div className="image-modal">
      <img src={link} className="modal-img" alt=""></img>
      <button className="close-button" onClick={() => setModalActive(false)}>
        Close
      </button>
    </div>
  ) : (
    <div className="delete-modal">
      <div className="prompt-container">
        <h2>{message}</h2>
        <div className="button-div">
          <button className="confirm-button" id="delete-button-yes" onClick={confirmAction}>
            Yes
          </button>
          <button className="delete-btn" id="delete-button-no" onClick={() => setModalActive(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
