import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import userContext from "./userContext";
import RoutesList from "./RoutesList";
import Nav from "./Nav";


function JoblyApp() {
  const [user, setUser] = useState({ username: "TESTUSER" }); //FIXME: null; just testing

  //Boolean to pass as props -- is a user logged in?
  const isLoggedIn = !!user;

  return (
    <>
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <Nav user={user} />
          <RoutesList isLoggedIn={!!user} />
        </BrowserRouter>
      </userContext.Provider>
    </>
  );

}

export default JoblyApp;
