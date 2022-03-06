import { createContext } from "react";

const UserContext = createContext({
  isLoggedIn: false,
  userToken: "",
  onLogout: () => {},
  onLogin: (user) => {},
});

export default UserContext;
