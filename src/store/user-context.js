import { createContext } from "react";

const UserContext = createContext({
  isLoggedIn: false,
  isAdmin: false,
  token: "",
  username: "",
  onLogout: () => {},
  onLogin: (user) => {},
});

export default UserContext;
