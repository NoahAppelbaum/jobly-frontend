import ErrorAlert from "../ErrorAlert";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import userContext from "../Contexts/userContext";
import "../stylesheets/UserProfile.css"

/** UserProfile: Displays user information/form to edit
 *
 * state:
 * - formData: {inputField, ...}
 * - errors: [err, ...]
 * - isLoading: boolean
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    try {
      await update(formData);
      navigate("/");
    } catch (err) {
      setErrors(err);
    }
    setIsLoading(false);
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
      <h1>{user.username}</h1>
      <form onSubmit={handleSubmit}>
        <div className="UserProfile-inputs">

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
        </div>

        <button>Save Changes</button>
      </form>
      {!!errors && <ErrorAlert errors={errors} />}
    </div>
  );
}

export default UserProfile;
