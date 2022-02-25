import styles from "./QuizResults.module.css";

import Button from "../UI/Button";

function QuizResults(props) {
  return (
    <div className={styles["quiz-results"]}>
      <h1>Personality Type: {props.type.title}</h1>
      <p>{props.type.description}</p>
      <Button onClick={props.onClose}>Close</Button>
    </div>
  );
}

export default QuizResults;
