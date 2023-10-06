import { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyCardList from "./CompanyCardList";
import SearchForm from "../SearchBar";
import Loading from "../Loading";
import "../stylesheets/CompanyList.css"


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
    async function getCompaniesFromBackend() {
      const companiesData = await JoblyApi.getCompanies(filters);
      setCompanies(companiesData);
    }
    getCompaniesFromBackend();
  }, [filters]);

  //callback for Companies SearchForm
  function searchCompanies(searchText) {
    setFilters(curr => ({ ...curr, nameLike: searchText }));
  }

  if (!companies) {
    return <Loading />;
  }

  return (
    <div className="CompanyList">
      <h1>Companies</h1>
      <SearchForm searchFunction={searchCompanies} placeholder="companies" />
      <h3 className="CompanyList-announcement">Click a company to see their available jobs!</h3>
      <CompanyCardList companies={companies} />
    </div>
  );
}

export default CompanyList;
