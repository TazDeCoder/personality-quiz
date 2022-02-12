import styles from "./QuizItem.module.css";

function QuizItem(props) {
  return (
    <li className={styles["quiz-item"]}>
      <h1 className={`${styles["quiz-item__label"]} ${styles["label--title"]}`}>
        {props.title}
      </h1>
      <button className={styles["quiz-item__btn"]}>Start Quiz</button>
      <p className={`${styles["quiz-item__label"]} ${styles["label--author"]}`}>
        Created By: <span className={styles["span--bold"]}>{props.author}</span>
      </p>
    </li>
  );
}

export default QuizItem;
