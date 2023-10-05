import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import userContext from "./userContext";
import RoutesList from "./RoutesList";
import Nav from "./Nav";
import JoblyApi from "./api";


function JoblyApp() {
  // const [currentUser, setCurrentUser] = useState({ username: "TESTUSER" }); //FIXME: null; just testing
  const [currentUser, setCurrentUser] = useState(null);

  const [token, setToken] = useState("");

  //TODO: move these all into utils and import (* as callbacks) up top?
  const login = async function (formData) {
    try {
      const response = await JoblyApi.login(formData);
      console.log("Got back:", response);
      JoblyApi.token = response.token;
      //TODO: do more stuff
    } catch (err) {
      return err;
    }
  };

  const signup = async function (formData) {
    try {
      const response = await JoblyApi.register(formData);
      console.log("Got back:", response);
      JoblyApi.token = response.token;
      //TODO: do more stuff
    } catch (err) {
      return err;
    }
  };

  const logout = function () {
    //TODO: ...
    console.log("LOGGING OUT");
  };

  const callbacks = { login, signup, logout }

  return (
    <>
      <userContext.Provider value={{ user: currentUser }}>
        <BrowserRouter>
          <Nav user={currentUser} callbacks={callbacks} />
          <RoutesList isLoggedIn={!!currentUser} callbacks={callbacks} />
        </BrowserRouter>
      </userContext.Provider>
    </>
  );

}

export default JoblyApp;
