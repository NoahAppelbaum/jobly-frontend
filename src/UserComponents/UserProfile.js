import ErrorAlert from "../ErrorAlert";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import userContext from "../Contexts/userContext";

/** UserProfile: Displays user information/form to edit
 *
 * state:
 * - formData: {inputField, ...}
 * - errors: [err, ...]
 *
 * props:
 * - update: callback
 *
 * RoutesList->UserProfile->ErrorAlert
 */
function UserProfile({ update }) {
  const { user } = useContext(userContext);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });
  const [errors, setErrors] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await update(formData);
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(curr => ({
      ...curr,
      [name]: value
    }));
  }

  return (
    <div className="UserProfile">
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <h2>{user.username}</h2>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          onChange={handleChange}
          value={formData.firstName}
        />

        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          onChange={handleChange}
          value={formData.lastName}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          type="email"
        />

        <button>Save Changes</button>
      </form>
      {!!errors && <ErrorAlert errors={errors} />}
    </div>
  );
}

export default UserProfile;
