import { useState } from "react";

/** SearchForm: searchbar for specified page
 *
 * state:
 * - formData
 *
 * props:
 * - searchFunction: callback
 *
 * { CompanyList, JobList }->SearchForm
 */
//TODO: simplify
function SearchForm({ searchFunction, placeholder = "" }) {
  const [formData, setFormData] = useState({ search: "" });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(curr => ({
      ...curr,
      [name]: value
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    searchFunction(formData.search);
    setFormData({ search: "" });
  }

  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <input
          id="search"
          name="search"
          onChange={handleChange}
          value={formData.search}
          placeholder={`search ${placeholder}`} />
        <button>Search</button>
      </form>
    </div>
  );

}

export default SearchForm;
