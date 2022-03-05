import { useContext } from "react";

import styles from "./ViewQuiz.module.css";
// COMPONENTS
import Button from "../UI/Button/Button";
// CONTEXTS
import QuizContext from "../../store/quiz-context";

function ViewQuiz(props) {
  const quizCtx = useContext(QuizContext);

  return (
    <div className={styles["view-quiz"]}>
      <div className={styles["view-quiz__remove"]}>
        <Button onClick={props.onRemoveQuiz.bind(null, quizCtx.id)}>
          Remove Quiz
        </Button>
      </div>

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
        <Button
          disabled={quizCtx.questions.length === 0}
          onClick={props.onStartQuiz}
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
}

export default ViewQuiz;
