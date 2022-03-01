import { useState } from "react";

import styles from "./QuestionItem.module.css";
import ListItem from "../UI/ListItem/ListItem";
import Button from "../UI/Button/Button";
import RemoveIcon from "../UI/Icons/RemoveIcon";

function QuestionItem(props) {
  const [showAnswers, setShowAnswers] = useState(false);

  const toggleQuestionHandler = (e) => {
    setShowAnswers((prevShowAnswers) => !prevShowAnswers);
  };

  return (
    <li className={styles["question-item"]}>
      <div className={styles["question-item__prompt"]}>
        <ListItem title={props.title} onClick={toggleQuestionHandler} />
        <Button onClick={props.onRemove}>
          <RemoveIcon />
        </Button>
      </div>
      {showAnswers && (
        <ul className={styles["question-item__answers"]}>
          {props.answers.map((answer) => (
            <li key={answer.id}>
              <ListItem title={answer.text} />
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
export default QuestionItem;
