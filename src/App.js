import "./App.css";
import { useState, useEffect, useRef } from "react";
import SearchBar from "./components/Navigation/SearchBar";
import Paginate from "./components/Pagination/Paginate";

const apiKey = "17940590-ac975b949658354994c9821cc";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [pageTotal, setPageTotal] = useState(0); // total number of pages from all the requests
  const [currentPage, setCurrentPage] = useState(1); // will be attached to the fetch request to get the page
  const [pageLimit] = useState(10);

  const isInitialMount = useRef(true); // used to prevent use effect firing before currentPage is updated
  const pageInitialMount = useRef(true); // used to prevent setPageTotal from firing before its actually set

  useEffect(() => {
    if (pageInitialMount.current) {
      pageInitialMount.current = false;
    } else {
      setPageTotal(Math.round(searchResults.totalHits / 20)); // calculates the total amount of pages if 20 results each
    }
  }, [searchResults]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      onSubmitSearch();
    }
    // eslint-disable-next-line
  }, [currentPage]);

  // sets the search query to whatever is inside the search bar
  const onInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // when submit is pressed the API is queried with the search query to get images
  const onSubmitSearch = async () => {
    try {
      let apiRequest = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&page=${currentPage}&per_page=20&q=${searchQuery}`
      );

      let data = await apiRequest.json();

      setSearchResults(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <SearchBar
        onInputChange={onInputChange}
        onSubmitSearch={onSubmitSearch}
      />
      {searchResults.length === 0 ? (
        <h1>No Results</h1>
      ) : (
        <Paginate
          searchResults={searchResults}
          pageTotal={pageTotal}
          pageLimit={pageLimit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default App;
