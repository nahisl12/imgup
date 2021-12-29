import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import Modal from "../Modal/Modal";
import { addFolder, deleteFolder, getUserFolders } from "../../Helpers/Requests";

const Dashboard = ({ user, folders, setFolders, setMessage, getImages }) => {
  const [newFolderName, setNewFolderName] = useState();
  const [folderName, setFolderName] = useState();
  const [modalActive, setModalActive] = useState(false);

  useEffect(() => {
    getFolders();

    // eslint-disable-next-line
  }, [setFolders]);

  const addNewFolder = async (event) => {
    event.preventDefault();
    try {
      if (folders.includes(newFolderName) || newFolderName.length > 12) {
        return setMessage("A folder with this name already exists/Name too long");
      } else {
        const data = await addFolder(user, newFolderName);

        if (data) {
          getFolders();
        }
      }
    } catch (error) {
      setMessage("Error adding new folder");
    }
  };

  // when the delete button is clicked the name of the folder is store and modal activated
  const setFolderToDelete = (event) => {
    setFolderName(event.currentTarget.value);
    setModalActive(true);
  };

  // Delete folder
  const deleteCurrentFolder = async (event) => {
    try {
      if (event.currentTarget.value.toLowerCase() !== "default") {
        const data = await deleteFolder(user, folderName);

        if (data) {
          getFolders();
          setModalActive(false);
          getImages();
        }
      } else {
        setMessage("The Default folder cannot be deleted");
      }
    } catch (error) {
      setMessage("An error occured while deleting the folder. Try Again");
    }
  };

  const getFolders = async () => {
    try {
      const data = await getUserFolders(user);

      if (data) {
        setFolders(data);
      }
    } catch (error) {
      setMessage("Oops! Something went wrong");
    }
  };

  return (
    <div>
      <div className="dashboard-text">
        <h1>Welcome to your dashboard {user.username}</h1>
      </div>

      {/* FORM FOR ADDING A NEW FOLDER */}
      <div className="add-folder-form">
        <form action="put">
          <label htmlFor="folderName"></label>
          <input
            type="text"
            name="folderName"
            id="folder-name"
            placeholder="Enter a folder to add"
            onChange={(event) => setNewFolderName(event.target.value)}
          />
          <button className="button-blue" onClick={addNewFolder}>
            Add Folder
          </button>
        </form>
      </div>

      <section className="dashboard-card-container">
        {folders.map((folder, index) => {
          return (
            <div key={index} className="folder-card">
              <h2>{folder}</h2>

              <button className="confirm-button">
                <NavLink
                  className="album-link"
                  key={index}
                  to={`albums/${folder}`}
                  state={{ folderName: folder }}
                >
                  Go To Folder
                </NavLink>
              </button>

              <button
                className="delete-btn"
                id="delete-folder-button"
                value={folder}
                onClick={setFolderToDelete}
              >
                <FontAwesomeIcon icon={faTrash} className="faTrash" />
              </button>
            </div>
          );
        })}
      </section>

      {modalActive && (
        <Modal
          type="prompt"
          confirmAction={deleteCurrentFolder}
          setModalActive={setModalActive}
          message="Delete Folder?"
        />
      )}
    </div>
  );
};

export default Dashboard;
