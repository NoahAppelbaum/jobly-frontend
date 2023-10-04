import { Route, Routes, Navigate } from "react-router-dom";
import CompanyList from "./CompanyList";
import JobList from "./JobList";
import Homepage from "./Homepage";
import CompanyDetail from "./CompanyDetail";


/** RoutesList
 *
 * App->RoutesList->Routes
 */
function RoutesList() {

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/jobs" element={<JobList />} />
      <Route path="/companies" element={<CompanyList />} />
      <Route path="/companies/:handle" element={<CompanyDetail />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  ); //TODO: bespoke 404/NotFound page??

}

export default RoutesList;
