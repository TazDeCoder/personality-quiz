import ReactDOM from "react-dom";

import "./index.css";
// COMPONENTS
import App from "./App";
// CONTEXTS
import UserProvider from "./store/UserProvider";

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById("root")
);
