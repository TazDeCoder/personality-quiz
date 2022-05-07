import { useContext } from "react";

import styles from "./QuizItem.module.css";
// COMPONENTS
import Button from "../../UI/Button/Button";
import Card from "../../UI/Card/Card";
// CONTEXTS
import QuizContext from "../../../store/quiz-context";

import { API_URL } from "../../../config";

function QuizItem(props) {
  const quizCtx = useContext(QuizContext);

  const viewQuizItemHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/api/quiz/${props.id}`);

      if (!response.ok) {
        const err = new Error("Failed to fetch quiz");
        err.status = response.status;
      }

      const data = await response.json();

      const transformedQuiz = {
        id: data._id,
        title: data.title,
        author: props.author,
        desc: data.description,
        questions: data.questions,
        types: data.types,
      };
      // Update current quiz
      quizCtx.setQuiz(transformedQuiz);
      // Open quiz
      props.onViewQuiz();
    } catch (err) {
      props.onError({
        title: `Something went wrong! (${err.status})`,
        message: err.message,
      });
    }
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
          Created By:
          <span className={styles["span--bold"]}>{props.author}</span>
        </p>
      </Card>
    </li>
  );
}

export default QuizItem;
