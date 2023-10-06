import { useState } from "react";
import ErrorAlert from "../ErrorAlert";


const initialState = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: ""
};

/** SignupForm
 *
 * state:
 * - formData: { formfield, ... }
 * - errors [{ message, status }, ...] || null
 *
 * props:
 * - signup: callback fn
 *
 * RoutesList->SignupForm->ErrorAlert
 */
function SignupForm({ signup }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(null);


  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(curr => ({
      ...curr,
      [name]: value
    }));
  }

  async function handleSubmit(evt) {
    console.log("Submitting Register Request");
    evt.preventDefault();
    try {
      await signup(formData);
    } catch (err) {
      setErrors(err);
    }
    setFormData(curr => ({ ...curr, username: "", password: "" }));
  }


  return (
    <div className="SignupForm">
      <h1>Find Your Future!</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          onChange={handleChange}
          value={formData.username} />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password} />

        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          onChange={handleChange}
          value={formData.firstName} />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          onChange={handleChange}
          value={formData.lastName} />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={formData.email} />

        <button>Sign Up</button>
      </form>
      {!!errors && <ErrorAlert errors={errors} />}
    </div>
  );
}


export default SignupForm;
