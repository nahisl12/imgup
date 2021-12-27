import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../Dashboard.css";

const ImageFull = ({ folders, user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { link, author, id, status, folder } = location.state;
  const [newStatus, setNewStatus] = useState(status);
  const [newFolder, setNewFolder] = useState(folder);

  const setStatus = (event) => {
    setNewStatus(event.target.value);
  };

  const setFolder = (event) => {
    setNewFolder(event.target.value);
  };

  const changeOptions = async (event) => {
    event.preventDefault();
    const editImageSettings = await fetch(
      "http://localhost:3001/api/image/edit",
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${user.accessToken}`,
        },
        body: JSON.stringify({
          imageId: id,
          folder: newFolder,
          status: newStatus,
        }),
      }
    );

    const data = await editImageSettings.json();
    if (data) {
      console.log(newStatus, newFolder, id, data);
      navigate(-1);
    } else {
      console.log("There was an error with the request");
    }
  };

  const deleteImage = async (event) => {
    event.preventDefault();
    // Delete image request here
    try {
      const editImageSettings = await fetch(
        "http://localhost:3001/api/image/delete",
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${user.accessToken}`,
          },
          body: JSON.stringify({
            imageId: id,
          }),
        }
      );

      const data = await editImageSettings.json();
      if (data) {
        console.log(newStatus, newFolder, id, data);
        navigate(-1);
      } else {
        console.log("There was an error with the request");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="button-blue"
        id="back-button"
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="faArrowLeft"
          onClick={deleteImage}
        />
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
              <select
                className="form-selection"
                id="status"
                name="status"
                onChange={setStatus}
              >
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>

            <div>
              <label htmlFor="folder"></label>
              <select
                className="form-selection"
                id="folder"
                name="folder"
                onChange={setFolder}
              >
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
              <button
                className="confirm-button"
                type="button"
                onClick={changeOptions}
              >
                Confirm
              </button>
            </div>
          </form>
        </section>

        <section>
          <button className="delete-btn">
            <FontAwesomeIcon
              icon={faTrash}
              className="faTrash"
              onClick={deleteImage}
            />
          </button>
        </section>
      </div>
    </>
  );
};

export default ImageFull;
