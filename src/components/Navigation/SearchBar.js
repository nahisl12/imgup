import React from "react";
import "./Navigation.css";

const SearchBar = ({ onInputChange, onSubmitSearch }) => {
  return (
    <div className="container">
      <input type="text" onChange={onInputChange} />
      <button onClick={onSubmitSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
