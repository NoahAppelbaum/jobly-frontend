import userContext from "./Contexts/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./stylesheets/Homepage.css"

/** Hompage: renders simple homepage */
function Homepage() {
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  return (
    <div className="Homepage">
      <h1>Jobly</h1>
      {
        !!user
          ?
          <>
            <h2>Your future is waiting, {user.firstName}!</h2>
          </>
          :
          <>
            <h3>See who's hiring, get the job details you need, and apply for jobs!</h3>
            <span>
              <button onClick={() => navigate("/login")}>Log In</button>
              <button onClick={() => navigate("/signup")}>Sign Up</button>
            </span>
          </>
      }

      <p className="Homepage-flavor-text">At Jobly, we believe every job application is a new opportunity for your future! But the <b>most important</b> job application is always the one you may or may not currently be fielding from me, Noah Appelbaum.</p>
    </div>
  );

}

export default Homepage;
