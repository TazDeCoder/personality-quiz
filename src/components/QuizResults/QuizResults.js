import styles from "./QuizResults.module.css";

function QuizResults(props) {
  return (
    <div className={styles["quiz-results"]}>
      <button
        className={styles["quiz-results__btn--close"]}
        onClick={props.onClose}
      >
        &times;
      </button>

      <header className={styles["quiz-results__header"]}>
        <h1>Personality Type: {props.type.title}</h1>
      </header>

      <p>{props.type.description}</p>
    </div>
  );
}

export default QuizResults;
