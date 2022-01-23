import React from 'react';

const Search = ({ value, onSearch }) => {
  return (
    <input
      type="search"
      placeholder="Search..."
      value={value}
      onChange={onSearch}
      type="search"
      className="form-control"
    />
  );
}

export default Search;