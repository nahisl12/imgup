import React from "react";
import "./Navigation.css";

const SearchBar = ({ onInputChange }) => {
  return (
    <div className="container">
      <input type="text" onChange={onInputChange} placeholder="Search Images By Uploader Name" />
      {/* <button className="button-blue" onClick={onSubmitSearch}>
        Search
      </button> */}
    </div>
  );
};

export default SearchBar;
