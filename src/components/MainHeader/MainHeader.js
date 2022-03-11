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

  const titleContent = (
    <>
      {!props.startQuiz && <h1>Home</h1>}
      {props.startQuiz && (
        <div className={styles["main-header__meta"]}>
          <p>Created By: {quizCtx.author}</p>
          <h1>{quizCtx.title}</h1>
        </div>
      )}
    </>
  );

  const statusContent = (
    <>
      {userCtx.isLoggedIn && !props.startQuiz && (
        <p>
          <span className={styles["status--active"]}>Logged In:</span>{" "}
          {userCtx.username}
        </p>
      )}
      {!userCtx.isLoggedIn && !props.startQuiz && (
        <p>
          <span className={styles["status--inactive"]}>Not Signed In</span>
        </p>
      )}
    </>
  );

  return (
    <header className={styles["main-header"]}>
      {titleContent}

      <Navigation
        startQuiz={props.startQuiz}
        onToggleLoginForm={props.onToggleLoginForm}
        onToggleSignupForm={props.onToggleSignupForm}
        onToggleQuizForm={props.onToggleQuizForm}
        onClose={props.onClose}
      />

      {statusContent}
    </header>
  );
};

export default MainHeader;
