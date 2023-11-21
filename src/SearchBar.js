import { useCallback } from "react";
import _ from "lodash";
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

  const debouncedSearch = useCallback(_.debounce(searchFunction, 400), []);

  function handleChange(evt) {

    debouncedSearch(evt.target.value);
  }

  return (
    <div className="SearchBar">
      <form>
        <input
          id="search"
          name="search"
          onChange={handleChange}
          placeholder={`search ${placeholder}`} />
      </form>
    </div>
  );

}

export default SearchBar;
