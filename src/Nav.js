import { NavLink } from "react-router-dom";

/** Nav: Nav bar
 *
 * props:
 * - user: { TODO: deets }
 *
 * JoblyApp->Nav
 */
function Nav({ user }) {


  return (
    <div className="Nav">
      <NavLink to={"/"}>Jobly</NavLink>
      {
        !!user
          ?
          <>
            <NavLink to={"/companies"}>Companies</NavLink>
            <NavLink to={"/jobs"}>Jobs</NavLink>
            <NavLink to={"/profile"}>{user.username}</NavLink>
            {/* TODO: LOGOUT?? */}
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
