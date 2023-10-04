import { NavLink } from "react-router-dom";

/** Nav: Nav bar */
function Nav() {

  return (
    <div className="Nav">
      <NavLink to={"/"}>Jobly</NavLink>
      <NavLink to={"/companies"}>Companies</NavLink>
      <NavLink to={"/jobs"}>Jobs</NavLink>
    </div>
  );
}

export default Nav;
