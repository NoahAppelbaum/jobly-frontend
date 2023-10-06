import { NavLink, Link } from "react-router-dom";
import "./stylesheets/Nav.css";

/** Nav: Nav bar
 *
 * props:
 * - user: { user info }
 * - logout: callback
 *
 * JoblyApp->Nav
 */
function Nav({ user, logout }) {
  return (
    <div className="Nav">

      <NavLink to={"/"}>Jobly</NavLink>
      <div className="Nav-pagelinks">

        {
          !!user
            ?
            <>
              <NavLink to={"/companies"}>Companies</NavLink>
              <NavLink to={"/jobs"}>Jobs</NavLink>
              <NavLink to={"/profile"}>Profile</NavLink>
              <Link onClick={logout} to={"/"}>Log out {user.username}</Link>
            </>
            :
            <>
              <NavLink to={"/login"}>Log In</NavLink>
              <NavLink to={"/signup"}>Sign Up</NavLink>
            </>

        }
      </div>
    </div>
  );
}

export default Nav;
