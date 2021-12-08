import "./App.css";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import CardList from "./components/Cards/CardList";
import Card from "./components/Cards/Card";

const apiKey = "17940590-ac975b949658354994c9821cc";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  let [searchResults, setSearchResults] = useState([]);

  // sets the search query to whatever is inside the search bar
  const onInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // when submit is pressed the API is queried with the search query to get images
  const onSubmitSearch = async () => {
    try {
      let apiRequest = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&per_page=3&q=${searchQuery}`
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
        <CardList results={searchResults} />
      )}
    </div>
  );
}

export default App;
