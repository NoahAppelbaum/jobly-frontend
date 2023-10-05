import userContext from "./Contexts/userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./stylesheets/homepage.css"

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
            <p>Your future is waiting, {user.firstName}</p>
          </>
          :
          <>
            <h3>The future is job!</h3>
            <span>
              <button onClick={() => navigate("/login")}>Log In</button>
              <button onClick={() => navigate("/signup")}>Sign Up</button>
            </span>
          </>
      }
    </div>
  );

}

export default Homepage;
