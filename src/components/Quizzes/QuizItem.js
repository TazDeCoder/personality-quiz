import styles from "./QuizItem.module.css";
import Button from "../UI/Button";
import Card from "../UI/Card";

function QuizItem(props) {
  const viewQuizItemHandler = () => {
    props.onViewQuiz(props.id);
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
