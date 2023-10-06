import { useState } from "react";
import ErrorAlert from "../ErrorAlert";
import "../stylesheets/LoginForm.css"

const initialState = {
  username: "",
  password: ""
};

/** LoginForm
 *
 * state:
 * - formData: { formfield, ... }
 * - errors [{ message, status }, ...] || null
 *
 * props:
 * - login: callback fn
 *
 * RoutesList->LoginForm->ErrorAlert
 */
function LoginForm({ login }) {
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
    console.log("Submitting Login Request");
    evt.preventDefault();
    try {
      await login(formData);
    } catch (err) {
      setErrors(err);
    }
    setFormData(initialState);
  }

  return (
    <div className="LoginForm">
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        <div className="LoginForm-inputs">
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

        </div>


        <button>Log In!</button>
      </form>
      {!!errors && <ErrorAlert errors={errors} />}
    </div>
  );
}

export default LoginForm;
