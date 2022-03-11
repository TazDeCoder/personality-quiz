import { useContext } from "react";

import styles from "./Navigation.module.css";
// COMPONENTS
import Button from "../UI/Button/Button";
// CONTEXTS
import UserContext from "../../store/user-context";

function Navigation(props) {
  let listContent;

  const userCtx = useContext(UserContext);

  if (!userCtx.isLoggedIn) {
    listContent = (
      <>
        <li>
          <Button onClick={props.onToggleLoginForm}>Login</Button>
        </li>

        <li>
          <Button onClick={props.onToggleSignupForm}>Sign up</Button>
        </li>
      </>
    );
  }

  if (userCtx.isLoggedIn && !props.startQuiz) {
    listContent = (
      <>
        <li>
          <Button onClick={props.onToggleQuizForm}>Add New Quiz</Button>
        </li>

        <li>
          <Button onClick={userCtx.onLogout}>Log out</Button>
        </li>
      </>
    );
  }

  if (props.startQuiz) {
    listContent = (
      <li>
        <Button onClick={props.onClose}>Home</Button>
      </li>
    );
  }

  return (
    <nav className={styles.nav}>
      <ul>{listContent}</ul>
    </nav>
  );
}

export default Navigation;
