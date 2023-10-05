import { NavLink, Link } from "react-router-dom";

/** Nav: Nav bar
 *
 * props:
 * - user: { TODO: deets }
 * - callbacks: { fn, ... }
 *
 * JoblyApp->Nav
 */
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
