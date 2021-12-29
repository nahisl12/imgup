import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import SearchBar from "./SearchBar";
import Paginate from "../Pagination/Paginate";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "../Dashboard/Dashboard";
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
  pageTotal,
  currentPage,
  setCurrentPage,
}) => {
  const [folders, setFolders] = useState([]);
  const [pageLimit] = useState(10);

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
                  <Paginate
                    searchResults={filteredImages}
                    pageTotal={pageTotal}
                    pageLimit={pageLimit}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                  />
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
                <Dashboard
                  user={user}
                  folders={folders}
                  setFolders={setFolders}
                  setMessage={setMessage}
                  getImages={onSubmitSearch}
                />
              }
            ></Route>

            <Route path="dashboard/albums/:id/" element={<ImageList user={user} setMessage={setMessage} />} />
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
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default UrlRoutes;
