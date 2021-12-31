import "./App.css";
import { useState, useEffect } from "react";
import { getPublicImages } from "./Helpers/Requests";

import NavBar from "./components/Navigation/NavBar";
import Notification from "./components/Notification/Notification";
import UrlRoutes from "./components/Navigation/UrlRoutes";
import Footer from "./components/Footer/Footer";

// TODOS
// make changing site colours easier - the website looks very dark on phone

function App() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // stores whatever value is entered in searchbar
  const [searchResults, setSearchResults] = useState([]); // the public images requested from backend are stored here
  const [currentPage, setCurrentPage] = useState(1); // will be attached to the fetch request to get the page
  const [message, setMessage] = useState(""); // for error notification

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
      const data = await getPublicImages();

      const dataReversed = data.reverse();
      setSearchResults(dataReversed);
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
      />

      <Footer />
    </div>
  );
}

export default App;
