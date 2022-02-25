import { useState } from "react";

import Button from "../UI/Button";
import styles from "./ViewQuiz.module.css";

function ViewQuiz(props) {
  const [isQuizDraft, setIsQuizDraft] = useState(
    props.quiz.questions.length !== 0
  );

  return (
    <div className={styles["view-quiz"]}>
      <div className={styles["view-quiz__content"]}>
        <h1>{props.quiz.title}</h1>
        <p>{props.quiz.desc}</p>
      </div>

      <div className={styles["view-quiz__meta"]}>
        <p>
          Number of questions: <span>{props.quiz.questions.length}</span>
        </p>
        <p>
          Created By: <span>{props.quiz.author}</span>
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
