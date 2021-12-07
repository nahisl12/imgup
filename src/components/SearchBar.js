import React from "react";

const SearchBar = ({ onInputChange, onSubmitSearch }) => {
  return (
    <div>
      <input type="text" onChange={onInputChange} />
      <button onClick={onSubmitSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
