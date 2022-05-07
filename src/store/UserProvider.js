import { useState, useEffect, useCallback } from "react";

import UserContext from "./user-context";

import { API_URL } from "../config";

function UserProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUserTokenInformation = localStorage?.getItem("userToken") ?? "";

    if (storedUserTokenInformation.length !== 0) {
      setToken(storedUserTokenInformation);
    }

    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    localStorage.removeItem("userToken");
    setToken("");
  };

  const loginHandler = async (user) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const err = new Error("Please try again");
        err.status = response.status;
        throw err;
      }

      const { token } = await response.json();

      setToken(token);
      localStorage.setItem("userToken", token);

      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
    } catch (err) {
      throw err;
    }
  };

  const fetchUserDetail = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/users/profile`, {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (!response.ok) {
        const err = new Error("Something went wrong!");
        err.status = response.status;
      }

      const { isAdmin, username } = await response.json();

      setIsAdmin(isAdmin);
      setUsername(username);
    } catch (err) {
      throw err;
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) fetchUserDetail();
  }, [fetchUserDetail, isLoggedIn]);

  const userContext = {
    isLoggedIn,
    isAdmin,
    token,
    username,
    onLogout: logoutHandler,
    onLogin: loginHandler,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
