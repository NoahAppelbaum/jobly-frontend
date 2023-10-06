import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/ApplicationForm.css";

function ApplicationForm() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (step >= 3) {
      navigate("/jobs");
    }
    setStep(curr => curr + 1);
  }

  return (
    <div className="ApplicationForm">
      <form onSubmit={handleSubmit}>
        {step === 1 &&
          <div className="ApplicationForm-input">
            <label htmlFor="resume">Ok, go ahead and upload your resume!</label>
            <input type="file" id="resume" name="resume" />
            <button>Go!</button>
          </div>}
        {step === 2 &&
          <div className="ApplicationForm-input">
            <label htmlFor="resume">Please type out your resume.</label>
            <input type="textarea" id="resume" name="resume" />
            <button>Go!</button>
          </div>}
        {step === 3 &&
          <div className="ApplicationForm-input">
            <label htmlFor="resume">Now, type your resume backwards.</label>
            <input type="textarea" id="resume" name="resume" />
            <button>Go!</button>
          </div>}
      </form>
    </div>
  );
}

export default ApplicationForm;
