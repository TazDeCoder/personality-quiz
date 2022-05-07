import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import UserProvider from "./store/UserProvider";

ReactDOM.render(
  <UserProvider>
    <App />
  </UserProvider>,
  document.getElementById("root")
);
