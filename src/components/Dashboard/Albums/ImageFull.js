import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Dashboard.css";
import { changeImageStatus, deleteUserImage } from "../../../Helpers/Requests";
import Modal from "../../Modal/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ImageFull = ({ folders, user, getImages, setMessage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { link, author, id, status, folder } = location.state; // data from the link page
  const [newStatus, setNewStatus] = useState(status);
  const [newFolder, setNewFolder] = useState(folder);
  const [modalActive, setModalActive] = useState(false);

  const setStatus = (event) => {
    setNewStatus(event.target.value);
  };

  const setFolder = (event) => {
    setNewFolder(event.target.value);
  };

  const changeOptions = async (event) => {
    event.preventDefault();

    const data = await changeImageStatus(user, id, newFolder, newStatus);

    if (data) {
      getImages();
      navigate(-1);
    } else {
      setMessage("There was an error with the request");
    }
  };

  const deleteImage = async (event) => {
    event.preventDefault();
    // Delete image request here
    try {
      const data = await deleteUserImage(user, id);

      if (data) {
        navigate(-1);
      } else {
        setMessage("There was an error with the request");
      }
    } catch (error) {
      setMessage("There was an error with the request");
    }
  };

  return (
    <>
      <button className="button-blue" id="back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} className="faArrowLeft" />
      </button>
      <div className="image-container">
        <div className="image-outer">
          <img className="image-large" src={link} alt="searchResult"></img>
          <div className="card-info">
            <h2 className="uploader">By {author}</h2>
          </div>
        </div>

        <section className="status-form">
          <div className="status-container">
            <h4>Status: {status}</h4>
            <h4>Folder: {folder}</h4>
          </div>

          <form>
            <div>
              <label htmlFor="status"></label>
              <select className="form-selection" id="status" name="status" onChange={setStatus}>
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>

            <div>
              <label htmlFor="folder"></label>
              <select className="form-selection" id="folder" name="folder" onChange={setFolder}>
                {folders.map((folder, index) => {
                  return (
                    <option value={folder} key={index}>
                      {folder}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <button className="confirm-button" type="button" onClick={changeOptions}>
                Confirm
              </button>
            </div>
          </form>
        </section>

        <section>
          <button className="delete-btn">
            <FontAwesomeIcon icon={faTrash} className="faTrash" onClick={() => setModalActive(true)} />
          </button>
        </section>
      </div>

      {modalActive && (
        <Modal
          type="prompt"
          confirmAction={deleteImage}
          setModalActive={setModalActive}
          message="Delete The Image?"
        />
      )}
    </>
  );
};

export default ImageFull;
