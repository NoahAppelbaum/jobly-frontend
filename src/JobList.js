import { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobCardList from "./JobCardList";
import SearchForm from "./SearchForm";


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
    setFilters(curr => ({ ...curr, title: searchText }));
  }

  if (!jobs) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="JobList">
      <SearchForm searchFunction={searchJobs} placeholder="jobs" />
      <JobCardList jobs={jobs} />
    </div>
  );
}

export default JobList;
