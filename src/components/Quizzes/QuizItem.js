import { useContext } from "react";

import styles from "./QuizItem.module.css";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import QuizContext from "../../store/quiz-context";

function QuizItem(props) {
  const quizCtx = useContext(QuizContext);

  const viewQuizItemHandler = () => {
    quizCtx.setQuiz(props.quiz);
    props.onViewQuiz();
  };

  return (
    <li>
      <Card className={styles["quiz-item"]}>
        <h1
          className={`${styles["quiz-item__label"]} ${styles["label--title"]}`}
        >
          {props.title}
        </h1>
        <Button
          className={styles["quiz-item__btn"]}
          onClick={viewQuizItemHandler}
        >
          See Details
        </Button>
        <p
          className={`${styles["quiz-item__label"]} ${styles["label--author"]}`}
        >
          Created By:{" "}
          <span className={styles["span--bold"]}>{props.author}</span>
        </p>
      </Card>
    </li>
  );
}

export default QuizItem;
