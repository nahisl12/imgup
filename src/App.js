import "./App.css";
import { useState, useEffect } from "react";
import { getPublicImages } from "./Helpers/Requests";

import NavBar from "./components/Navigation/NavBar";
import Notification from "./components/Notification/Notification";
import UrlRoutes from "./components/Navigation/UrlRoutes";

function App() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pageTotal, setPageTotal] = useState(1); // total number of pages from all the requests
  const [currentPage, setCurrentPage] = useState(1); // will be attached to the fetch request to get the page
  const [message, setMessage] = useState(""); // for error notification

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
      let data = await getPublicImages();

      setSearchResults(data);
    } catch (error) {
      setMessage("An error occured");
    }
  };

  // send filtered images based on author user typed into search bar down
  const filteredImages = searchResults.filter((image) => {
    return image.author.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />

      {message && <Notification message={message} setMessage={setMessage} />}

      <UrlRoutes
        user={user}
        setUser={setUser}
        onInputChange={onInputChange}
        searchResults={searchResults}
        filteredImages={filteredImages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setMessage={setMessage}
        onSubmitSearch={onSubmitSearch}
        pageTotal={pageTotal}
      />
    </div>
  );
}

export default App;
