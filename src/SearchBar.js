import { useState } from "react";
import "./stylesheets/SearchBar.css";

/** SearchBar: searchbar for specified page
 *
 * state:
 * - searchField: (string) value of search text field
 *
 * props:
 * - searchFunction: callback
 *
 * { CompanyList, JobList }->SearchBar
 */
function SearchBar({ searchFunction, placeholder = "" }) {
  const [searchField, setSearchField] = useState("");

  function handleChange(evt) {
    const { value } = evt.target;
    setSearchField(value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    searchFunction(searchField);
    setSearchField("");
  }

  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit}>
        <input
          id="search"
          name="search"
          onChange={handleChange}
          value={searchField}
          placeholder={`search ${placeholder}`} />
        <button>Search</button>
      </form>
    </div>
  );

}

export default SearchBar;
