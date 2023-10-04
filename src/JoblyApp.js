import { BrowserRouter } from "react-router-dom";
import RoutesList from "./RoutesList";
import Nav from "./Nav";

function JoblyApp() {

  return (
    <>
      <BrowserRouter>
        <Nav />
        <RoutesList />
      </BrowserRouter>
    </>
  );

}

export default JoblyApp;
