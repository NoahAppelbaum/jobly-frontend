import { useContext, useState } from "react"; //TODO: no context, just access to local storage?
import userContext from "../userContext";
import ErrorAlert from "../ErrorAlert";
import JoblyApi from "../api";

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

  //TODO: isLoading state for this?
  async function handleSubmit(evt) {
    console.log("Submitting Login Request");
    evt.preventDefault();
    //try to log in -- get errors back if it fails
    const newErrors = await login(formData);
    setErrors(newErrors);
    setFormData(initialState);
  }

  return (
    <div className="LoginForm">
      <h1>Log In</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          onChange={handleChange}
          value={formData.username} />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          onChange={handleChange}
          value={formData.password} />

        <button>Log In</button>
      </form>
      {!!errors && <ErrorAlert errors={errors} />}
    </div>
  );
}

export default LoginForm;
