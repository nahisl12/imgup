import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import SearchBar from "./components/Navigation/SearchBar";
import Paginate from "./components/Pagination/Paginate";
import Login from "./components/Navigation/Login";
import Register from "./components/Navigation/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Upload from "./components/Navigation/Upload";
import ImageList from "./components/Dashboard/Albums/ImageList";
import ImageFull from "./components/Dashboard/Albums/ImageFull";

// stuff to do
// fix search bar so that it filters images shown by username/author and as they type using .includes
// aditional styling to make site look nicer

function App() {
  const [user, setUser] = useState(null);
  const [folders, setFolders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pageTotal, setPageTotal] = useState(1); // total number of pages from all the requests
  const [currentPage, setCurrentPage] = useState(1); // will be attached to the fetch request to get the page
  const [pageLimit] = useState(10);

  useEffect(() => {
    setPageTotal(Math.round(searchResults.length / 20)); // calculates the total amount of pages if 20 results each
  }, [searchResults]);

  useEffect(() => {
    onSubmitSearch();
    // eslint-disable-next-line
  }, [currentPage]);

  // sets the search query to whatever is inside the search bar
  const onInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // when submit is pressed the API is queried with the search query to get images
  const onSubmitSearch = async () => {
    try {
      let apiRequest = await fetch(`http://localhost:3001/api/image/`);

      let data = await apiRequest.json();

      setSearchResults(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <nav className="navbar-container">
        <ul>
          <li>
            <Link to="/" className="navbar-links">
              Home
            </Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/login" className="navbar-links">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="navbar-links">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="navbar-links">
                {`${user.username}'s Dashboard`}
              </Link>
              <Link to="/upload" className="navbar-links">
                Upload
              </Link>
              <Link
                to="/"
                className="navbar-links"
                onClick={() => setUser(null)}
              >
                Logout
              </Link>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar
                onInputChange={onInputChange}
                onSubmitSearch={onSubmitSearch}
              />
              {searchResults.length === 0 ? (
                <h1>No Results</h1>
              ) : (
                <>
                  <Paginate
                    searchResults={searchResults}
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
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register />} />
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
                />
              }
            ></Route>

            <Route
              path="dashboard/albums/:id/"
              element={<ImageList user={user} />}
            />
            <Route
              path="dashboard/albums/:id/:image"
              element={<ImageFull folders={folders} user={user} />}
            />
            <Route path="/upload" element={<Upload user={user} />} />
            <Route path="/" />
          </>
        )}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
