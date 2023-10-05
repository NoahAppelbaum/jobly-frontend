import { NavLink, Link } from "react-router-dom";
import "./stylesheets/Nav.css"

/** Nav: Nav bar
 *
 * props:
 * - user: { user info }
 * - callbacks: { fn, ... }
 *
 * JoblyApp->Nav
 */ //TODO: pass this the actual callback it needs?
function Nav({ user, callbacks }) {
  return (
    <div className="Nav">
      <NavLink to={"/"}>Jobly</NavLink>
      {
        !!user
          ?
          <>
            <NavLink to={"/companies"}>Companies</NavLink>
            <NavLink to={"/jobs"}>Jobs</NavLink>
            <NavLink to={"/profile"}>Profile</NavLink>
            <Link onClick={callbacks.logout} to={"/"}>Log Out {user.username}</Link>
          </>
          :
          <>
            <NavLink to={"/login"}>Log In</NavLink>
            <NavLink to={"/signup"}>Sign Up</NavLink>
          </>

      }
    </div>
  );
}

export default Nav;
