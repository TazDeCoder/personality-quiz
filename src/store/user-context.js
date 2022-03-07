import { createContext } from "react";

const UserContext = createContext({
  isLoggedIn: false,
  token: "",
  id: "",
  username: "",
  onLogout: () => {},
  onLogin: (user) => {},
});

export default UserContext;
