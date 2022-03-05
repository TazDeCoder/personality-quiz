import { useContext } from "react";

import styles from "./MainHeader.module.css";
import Navigation from "./Navigation";
import QuizContext from "../../store/quiz-context";

const MainHeader = (props) => {
  const quizCtx = useContext(QuizContext);

  return (
    <header className={styles["main-header"]}>
      {!props.startQuiz && <h1>Personality Quiz</h1>}
      {props.startQuiz && <h1>{quizCtx.title}</h1>}
      <Navigation
        startQuiz={props.startQuiz}
        onToggleForm={props.onToggleQuizForm}
        onClose={props.onClose}
      />
    </header>
  );
};

export default MainHeader;
