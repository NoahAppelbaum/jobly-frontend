import userContext from "./userContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

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
            {/*TODO: Maybe should be first name here: */}
            <p>Your future is waiting, {user.username}</p>
          </>
          :
          <>
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
