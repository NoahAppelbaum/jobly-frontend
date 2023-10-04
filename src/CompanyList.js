import { useState, useEffect } from "react";
import JoblyApi from "./api";
import CompanyCardList from "./CompanyCardList";
import SearchForm from "./SearchForm";


/** CompanyList: logical parent component for listing companies
 *
 * state:
 * - companies: [{ handle, name, description, numEmployees, logoUrl }, ...]
 * - filters: { (optional) minEmployees, maxEmployees, nameLike }
 *
 * RoutesList->CompanyList->{ SearchForm, CompanyCardList }
*/
function CompanyList() {
  const [companies, setCompanies] = useState(null);
  const [filters, setFilters] = useState({});

  //fetch companies on render and updated filters
  useEffect(() => { //will need to change this callback name when changing model fn
    async function getCompanies() {
      const companiesData = await JoblyApi.getAllCompanies(filters);
      setCompanies(companiesData);
    }
    getCompanies();
  }, [filters]);

  //callback for Companies SearchForm
  function searchCompanies(searchText) {
    setFilters(curr => ({ ...curr, nameLike: searchText }));
  }

  if (!companies) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="CompanyList">
      <SearchForm searchFunction={searchCompanies} placeholder="companies" />
      <CompanyCardList companies={companies} />
    </div>
  );
}

export default CompanyList;
