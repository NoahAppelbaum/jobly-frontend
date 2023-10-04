/** JobCard: displays Job information
 *
 * props:
 * - JobData: { id, title, salary, equity, companyHandle, companyName }
 *
 * JobCardList->JobCard
 */
function JobCard({ jobData }) {
  console.log("jobData:", jobData);

  return ( //TODO: alla' this!
    <div className="JobCard">
      <h1>Be a real {jobData.title} {
        jobData.companyName ? `at ${jobData.companyName}` : ""}</h1>
    </div>
  );
}

export default JobCard;
