import JobCard from "./JobCard";

/** JobCardList: renders JobCards from passed array
 *
 * props:
 * - jobs: [{ job information }, ...]
 *
 * { JobList, CompanyDetail }->JobCardList->JobCard
 */
function JobCardList({ jobs }) {

  return (
    <>
      {jobs.map(j => <JobCard key={j.id} jobData={j} />)}
    </>
  );

}

export default JobCardList;
