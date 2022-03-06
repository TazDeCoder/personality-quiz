import { useState, useEffect } from "react";

import UserContext from "./user-context";

function UserProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    localStorage.removeItem("userToken");
    setUserToken("");
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
      localStorage.setItem("userToken", token);
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (err) {
      throw err;
    }
  };

  const userContext = {
    isLoggedIn,
    userToken,
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
