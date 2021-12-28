import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";
import {
  addFolder,
  deleteFolder,
  getUserFolders,
} from "../../Helpers/Requests";

const Dashboard = ({ user, folders, setFolders, setMessage }) => {
  const [newFolderName, setNewFolderName] = useState();

  useEffect(() => {
    getFolders();

    // eslint-disable-next-line
  }, [setFolders]);

  const addNewFolder = async (event) => {
    event.preventDefault();
    try {
      if (folders.includes(newFolderName)) {
        return setMessage("A folder with this name already exists");
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

  // Delete folder
  const deleteCurrentFolder = async (event) => {
    const folder = event.currentTarget.value;
    try {
      if (event.currentTarget.value.toLowerCase() !== "default") {
        const data = await deleteFolder(user, folder);

        if (data) {
          getFolders();
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
      } else {
        setMessage("Oops! Something went wrong");
      }
    } catch (error) {
      setMessage("Oops! Something went wrong");
    }
  };

  return (
    <div>
      <h1>Welcome to your dashboard {user.username}</h1>

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
              <NavLink
                className="album-link"
                key={index}
                to={`albums/${folder}`}
                state={{ folderName: folder }}
              >
                {folder}
              </NavLink>

              <button
                className="delete-btn"
                id="delete-folder-button"
                value={folder}
                onClick={deleteCurrentFolder}
              >
                <FontAwesomeIcon icon={faTrash} className="faTrash" />
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Dashboard;
