import { useState, useEffect, useCallback } from "react";

import UserContext from "./user-context";

function UserProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
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
      const response = await fetch("/login", {
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
      const response = await fetch("/users/profile", {
        method: "GET",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (!response.ok) {
        const err = new Error("Something went wrong!");
        err.status = response.status;
      }

      const data = await response.json();

      setId(data._id);
      setUsername(data.username);
    } catch (err) {
      throw err;
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) fetchUserDetail();
  }, [fetchUserDetail]);

  const userContext = {
    isLoggedIn,
    token,
    id,
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
