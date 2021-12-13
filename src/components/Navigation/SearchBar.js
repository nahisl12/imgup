import React from "react";
import "./Navigation.css";

const SearchBar = ({ onInputChange, onSubmitSearch }) => {
  return (
    <div className="container">
      <input
        type="text"
        onChange={onInputChange}
        placeholder="Search an image"
      />
      <button onClick={onSubmitSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
