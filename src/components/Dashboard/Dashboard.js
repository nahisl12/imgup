import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = ({ user, folders, setFolders }) => {
  const [newFolderName, setNewFolderName] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getFolders();
  }, [setFolders]);

  const addNewFolder = async (event) => {
    event.preventDefault();
    try {
      if (folders.includes(newFolderName)) {
        return console.log("this folder already exists");
      } else {
        const addFolder = await fetch(
          "http://localhost:3001/api/users/folders/new",
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${user.accessToken}`,
            },
            body: JSON.stringify({
              folder: newFolderName,
            }),
          }
        );

        const data = await addFolder.json();

        if (data) {
          console.log("new folder successfully created", data);
          getFolders();
        }
      }
    } catch (error) {
      console.log(error);
    }

    console.log(newFolderName);
  };

  // Delete folder
  const deleteFolder = async (event) => {
    const folder = event.target.value;
    try {
      if (event.target.value.toLowerCase() !== "default") {
        const deleteFolder = await fetch(
          "http://localhost:3001/api/users/folders/delete",
          {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
              authorization: `bearer ${user.accessToken}`,
            },
            body: JSON.stringify({
              folderName: folder,
            }),
          }
        );

        const data = await deleteFolder.json();
        console.log(folder);

        if (data) {
          console.log("successfully deleted the folder");
          getFolders();
        }
        console.log(event.target.value);
      } else {
        console.log("the default folder cannot be deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFolders = async () => {
    try {
      const reqFolders = await fetch(
        "http://localhost:3001/api/users/folders",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${user.accessToken}`,
          },
        }
      );

      const resFolders = await reqFolders.json();

      if (resFolders) {
        setFolders(resFolders);
        console.log(resFolders);
      } else {
        console.log("there was an error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Welcome to your dashboard {user.username}</h1>
      <div className="add-folder-form">
        <form action="put">
          <label htmlFor="folderName"></label>
          <input
            type="text"
            name="folderName"
            id="folderName"
            placeholder="Enter a folder to add"
            onChange={(event) => setNewFolderName(event.target.value)}
          />
          <button onClick={addNewFolder}>Add Folder</button>
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

              <button onClick={deleteFolder} value={folder}>
                Delete Folder
              </button>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Dashboard;
