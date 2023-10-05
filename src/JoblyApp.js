import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import decode from "jwt-decode";
import userContext from "./userContext";
import RoutesList from "./RoutesList";
import Nav from "./Nav";
import JoblyApi from "./api";

//TODO: DocString
function JoblyApp() {
  const [currentUser, setCurrentUser] = useState(null); //TODO:composite state -- we have a user/loading
  const [token, setToken] = useState(null);             // Loading component renders when loading

  //TODO: useEffect on render to check localstorage for token/user?
  //    (or "useLocalStorage" hook)

  useEffect(() => {
    async function getUserFromToken(newToken) {
      const { username } = decode(newToken);
      const response = await JoblyApi.getUser(username);
      setCurrentUser(response.user);
    }
    JoblyApi.token = token || "";
    if (token) {
      //TODO: Error handling -- what if server is down/can't find user in db?
      getUserFromToken(token);
    } else {
      setCurrentUser(null);
    }
  }, [token])

  //TODO: these don't need to be anonymous
  const login = async function (formData) {
    try {
      const response = await JoblyApi.login(formData);
      console.log("Got back:", response);
      setToken(response.token); //TODO: throwe <Navigate /> in here and below
    } catch (err) {
      return err;
    }
  };

  async function signup(formData) { //TODO: above, same here
    try {
      const response = await JoblyApi.register(formData);
      console.log("Got back:", response);
      setToken(response.token);
    } catch (err) {
      return err;
    }
  };

  const logout = function () {
    console.log("LOGGING OUT");
    setToken(null);
  };
  //TODO: move these^^^ all into utils and import `(* as callbacks)` up top?
  // Q: can I pass/export setToken to a util module?
  //    ...And then import that module here?
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
