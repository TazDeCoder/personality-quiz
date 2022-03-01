import { useState, useContext } from "react";

import styles from "./ViewQuiz.module.css";
import Button from "../UI/Button/Button";
import QuizContext from "../../store/quiz-context";

function ViewQuiz(props) {
  const quizCtx = useContext(QuizContext);

  const [isQuizDraft, setIsQuizDraft] = useState(
    quizCtx.questions.length !== 0
  );

  return (
    <div className={styles["view-quiz"]}>
      <div className={styles["view-quiz__content"]}>
        <h1>{quizCtx.title}</h1>
        <p>{quizCtx.desc}</p>
      </div>

      <div className={styles["view-quiz__meta"]}>
        <p>
          Number of questions: <span>{quizCtx.questions.length}</span>
        </p>
        <p>
          Created By: <span>{quizCtx.author}</span>
        </p>
      </div>

      <div className={styles["view-quiz__actions"]}>
        <Button onClick={props.onEditQuiz}>Edit Quiz</Button>
        <Button disabled={!isQuizDraft} onClick={props.onStartQuiz}>
          Start Quiz
        </Button>
      </div>
    </div>
  );
}

export default ViewQuiz;
