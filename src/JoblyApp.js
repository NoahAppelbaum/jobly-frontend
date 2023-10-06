import { BrowserRouter, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import decode from "jwt-decode";
import userContext from "./Contexts/userContext";
import RoutesList from "./RoutesList";
import Nav from "./Nav";
import Loading from "./Loading";
import JoblyApi from "./api";
import "./stylesheets/JoblyApp.css"

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
  //Set token to localStorage value/lack thereof
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //When a token changes -- we log in, or we log out:
  //If there's a token, get the currentUser from the API and set state
  //Update the token on JoblyApi
  useEffect(() => {
    async function getUserFromToken(newToken) {
      const { username } = decode(newToken);
      try {
        const response = await JoblyApi.getUser(username);
        localStorage.setItem("token", token);
        setCurrentUser(response.user);
      } catch (err) {
      //TODO: State for errors? Render ErrorAlert below Nav?
      }
      //load page, now that we have a user
      setIsLoading(false);
    }

    JoblyApi.token = token || "";
    if (token) {
      getUserFromToken(token);
    } else {
      setIsLoading(false);
    }
  }, [token]);

  async function login(formData) {
    const newToken = await JoblyApi.login(formData);
    setToken(newToken);
  }

  async function signup(formData) {
    const newToken = await JoblyApi.register(formData);
    setToken(newToken);
  };

  function logout() {
    console.log("LOGGING OUT");
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
  };

  async function update(formData) {
    const updatedUser =
      await JoblyApi.updateUser(currentUser.username, formData);
    updatedUser.applications = currentUser.applications;
    setCurrentUser(updatedUser);
  }

  //TODO: move these^^^ to custom hook

  const callbacks = { login, signup, logout, update };

  if (isLoading) {
    console.log("LOADING");
    return <Loading />;
  }

  return (
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
