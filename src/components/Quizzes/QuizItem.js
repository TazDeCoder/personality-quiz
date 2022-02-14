import styles from "./QuizItem.module.css";
import Button from "../UI/Button";

function QuizItem(props) {
  return (
    <li className={styles["quiz-item"]}>
      <h1 className={`${styles["quiz-item__label"]} ${styles["label--title"]}`}>
        {props.title}
      </h1>
      <Button className={styles["quiz-item__btn"]}>Start Quiz</Button>
      <p className={`${styles["quiz-item__label"]} ${styles["label--author"]}`}>
        Created By: <span className={styles["span--bold"]}>{props.author}</span>
      </p>
    </li>
  );
}

export default QuizItem;
