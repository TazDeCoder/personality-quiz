import { useContext } from "react";

import styles from "./MainHeader.module.css";
// COMPONENTS
import Navigation from "./Navigation";
// CONTEXTS
import QuizContext from "../../store/quiz-context";
import UserContext from "../../store/user-context";

const MainHeader = (props) => {
  const userCtx = useContext(UserContext);
  const quizCtx = useContext(QuizContext);

  return (
    <header className={styles["main-header"]}>
      {!props.startQuiz && <h1>Home</h1>}
      {props.startQuiz && <h1>{quizCtx.title}</h1>}
      <Navigation
        startQuiz={props.startQuiz}
        onToggleLoginForm={props.onToggleLoginForm}
        onToggleSignupForm={props.onToggleSignupForm}
        onToggleQuizForm={props.onToggleQuizForm}
        onClose={props.onClose}
      />
      {userCtx.isLoggedIn && !props.startQuiz && (
        <p>
          Logged In: <span>{userCtx.username}</span>
        </p>
      )}
    </header>
  );
};

export default MainHeader;
