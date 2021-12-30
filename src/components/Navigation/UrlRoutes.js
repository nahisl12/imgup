import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SearchBar from "./SearchBar";
import Paginate from "../Pagination/Paginate";
import Login from "./Login";
import Register from "./Register";
import Upload from "./Upload";
import ImageList from "../Dashboard/Albums/ImageList";
import ImageFull from "../Dashboard/Albums/ImageFull";

const UrlRoutes = ({
  user,
  setUser,
  onInputChange,
  searchResults,
  filteredImages,
  setMessage,
  onSubmitSearch,
}) => {
  const [folders, setFolders] = useState([]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar onInputChange={onInputChange} />
              {searchResults.length === 0 ? (
                <h1>No Results</h1>
              ) : (
                <>
                  <Paginate searchResults={filteredImages} itemsPerPage={25} type="homepage" />
                </>
              )}
            </>
          }
        ></Route>

        {!user ? (
          <>
            <Route path="/login" element={<Login setUser={setUser} setMessage={setMessage} />} />
            <Route path="/register" element={<Register setMessage={setMessage} />} />
          </>
        ) : (
          <>
            <Route
              path="dashboard"
              element={
                <Paginate
                  user={user}
                  searchResults={folders}
                  type="dashboard"
                  setFolders={setFolders}
                  setMessage={setMessage}
                  getImages={onSubmitSearch}
                  itemsPerPage={25}
                />
              }
            ></Route>

            <Route
              path="dashboard/albums/:id/"
              element={<ImageList user={user} setMessage={setMessage} itemsPerPage={25} />}
            />
            <Route
              path="dashboard/albums/:id/:image"
              element={
                <ImageFull folders={folders} user={user} getImages={onSubmitSearch} setMessage={setMessage} />
              }
            />
            <Route path="/upload" element={<Upload user={user} />} />
            <Route path="/" />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default UrlRoutes;
