import { useState, useEffect } from "react";
import JoblyApi from "../api";
import JobCardList from "./JobCardList";
import SearchForm from "../SearchBar";
import Loading from "../Loading";
import "../stylesheets/JobList.css"


/** JobList: logical parent component for listing jobs
 *
 * state:
 * - jobs: [{ id, title, salary, equity, companyHandle, companyName }, ...]
 * - filters: { (optional) minSalary, hasEquity, title }
 *
 * RoutesList->JobList->{ SearchForm, JobCardList }
*/
function JobList() {
  const [jobs, setJobs] = useState(null);
  const [filters, setFilters] = useState({});

  //fetch jobs on render and updated filters
  useEffect(() => {
    async function getJobsFromBackend() {
      const jobsData = await JoblyApi.getJobs(filters);
      setJobs(jobsData);
    }
    getJobsFromBackend();
  }, [filters]);

  //callback for Jobs SearchForm
  function searchJobs(searchText) {
    if (searchText) {
      setFilters(curr => ({ ...curr, title: searchText }));
    } else {
      setFilters(curr => {
        const clearSearch = { ...curr };
        delete clearSearch.title;
        return clearSearch;
      })
   }
  }

  if (!jobs) {
    return <Loading />;
  }

  return (
    <div className="JobList">
      <h1>Jobs</h1>
      <SearchForm searchFunction={searchJobs} placeholder="jobs" />
      <h3 className="JobList-announcement">{
        jobs.length
          ? "Your future is waiting!"
          : "We couldn't find any jobs that matched that criteria"
      }</h3>
      <JobCardList jobs={jobs} />
    </div>
  );
}

export default JobList;
