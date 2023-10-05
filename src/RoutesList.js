import { Route, Routes, Navigate } from "react-router-dom";
import CompanyList from "./CompanyComponents/CompanyList";
import JobList from "./JobComponents/JobList";
import Homepage from "./Homepage";
import CompanyDetail from "./CompanyComponents/CompanyDetail";
import UserProfile from "./UserComponents/UserProfile";
import LoginForm from "./AuthComponents/LoginForm";
import SignupForm from "./AuthComponents/SignupForm";


/** RoutesList
 *
 * props:
 * - isLoggedIn: boolean
 * - callbacks: { fn, ... }
 *
 * App->RoutesList->Routes
 */
function RoutesList({ isLoggedIn, callbacks }) {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {
        isLoggedIn
          ?
          <>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/jobs" element={<JobList />} />
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
          </>
          :
          <>
            <Route
              path="/login"
              element={<LoginForm login={callbacks.login} />}
            />
            <Route
              path="/signup"
              element={<SignupForm signup={callbacks.signup} />}
            />
          </>
      }
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ); //TODO: bespoke 404/NotFound page??

}

export default RoutesList;
