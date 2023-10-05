import { BrowserRouter, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import decode from "jwt-decode";
import userContext from "./Contexts/userContext";
import RoutesList from "./RoutesList";
import Nav from "./Nav";
import Loading from "./Loading";
import JoblyApi from "./api";

/** JoblyApp: parent app component
 *
 * state:
 * - currentUser: {user details} || null
 * - token: JWT || null
 * - isLoading: boolean
 *
 * App->JoblyApp->{ Nav, RoutesList, Loading }
 */
function JoblyApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      try {
        getUserFromToken(token);
      } catch (err) {
        //TODO: State for errors? Render ErrorAlert below Nav?
      }
    } else {
      setCurrentUser(null);
    }
  }, [token]);

  async function login(formData) {
    setIsLoading(true);
    const response = await JoblyApi.login(formData);
    console.log("Got back:", response);
    setToken(response.token);
    setIsLoading(false); //FIXME: Oh no, I don't get here if there are errors!
    <Navigate to={"/"} />; // -- Does loading need to be in context!? to reset on err catch?
  };

  async function signup(formData) {
    setIsLoading(true);
    const response = await JoblyApi.register(formData);
    console.log("Got back:", response);
    setToken(response.token);
    setIsLoading(false);
    <Navigate to={"/"} />;
  };

  function logout() {
    console.log("LOGGING OUT");
    setToken(null);
  };
  //TODO: move these^^^ all into utils and import `(* as callbacks)` up top?
  // Q: can I pass/export setToken to a util module?
  //    ...And then import that module here?
  const callbacks = { login, signup, logout };

  if (isLoading) {
    return <Loading />;
  }

  return (//FIXME: add loading context w/ setIsLoading provider, consume in login/signup
    <>
      <userContext.Provider value={{ user: currentUser }}>
        <BrowserRouter>
          <Nav user={currentUser} logout={callbacks.logout} />
          <RoutesList isLoggedIn={!!currentUser} callbacks={callbacks} />
        </BrowserRouter>
      </userContext.Provider>
    </>
  );

}

export default JoblyApp;
