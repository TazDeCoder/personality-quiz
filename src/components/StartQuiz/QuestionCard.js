import styles from "./QuestionCard.module.css";
import Card from "../UI/Card/Card";

function QuestionCard(props) {
  const answerChangeHandler = (e) => {
    e.target.setAttribute("checked", true);
  };

  return (
    <Card className={styles["question-card"]}>
      <legend>{props.prompt}</legend>
      <ul className={styles["question-card__list"]}>
        {props.answers.map((answer) => (
          <li key={answer.id}>
            <label>{answer.text}</label>
            <input
              id={answer.id}
              type="radio"
              name={props.groupName}
              value={answer.types}
              onChange={answerChangeHandler}
              required
            />
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default QuestionCard;
