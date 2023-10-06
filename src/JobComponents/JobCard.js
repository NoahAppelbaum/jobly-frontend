import ApplyButton from "./ApplyButton";

/** JobCard: displays Job information
 *
 * props:
 * - jobData: { id, title, salary, equity, companyHandle, companyName }
 *
 * JobCardList->JobCard->ApplyButton
 */
function JobCard({ jobData }) {
  console.log("jobData:", jobData);

  return (
    <div className="JobCard">
      <h3>{jobData.title} </h3>
      {jobData.companyName?.length && <h4>{jobData.companyName}</h4>}
      <div className="JobCard-details">
        <p>Salary: {jobData.salary}</p>
        <p>Equity: {jobData.equity || "Not Listed"}</p>
      </div>
      <ApplyButton jobId={jobData.id} />
    </div>
  );
}

export default JobCard;
