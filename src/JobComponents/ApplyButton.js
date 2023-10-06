import { useState, useContext } from "react";
import userContext from "../Contexts/userContext";
import JoblyApi from "../api";
import "../stylesheets/ApplyButton.css"


/** ApplyButton: triggers job application process
 *
 * state:
 * - applied: boolean
 * - errors: [err, ...]
 *
 * props:
 * - jobId: int
 *
 * JobCard->ApplyButton
 */
function ApplyButton({ jobId }) {
  const { user } = useContext(userContext);
  const [applied, setApplied] = useState(
    user.applications.some(a => a === jobId)
  );
  const [errors, setErrors] = useState(null);

  async function handleClick() {
    try {
      await JoblyApi.applyForJob(user.username, jobId);
      user.applications.push(jobId);
      setApplied(true);
      setErrors(null);
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <>
      <button className="ApplyButton" disabled={applied} onClick={handleClick}>
        {applied ? "Applied" : "Apply!"}
      </button>
      {!!errors && <p>Could not apply for job :(</p>}
    </>
  );

}

export default ApplyButton;
