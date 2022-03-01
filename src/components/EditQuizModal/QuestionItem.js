import { useState } from "react";

import styles from "./QuestionItem.module.css";
import ListItem from "../UI/ListItem/ListItem";

function QuestionItem(props) {
  const [showAnswers, setShowAnswers] = useState(false);

  const toggleQuestionHandler = (e) => {
    setShowAnswers((prevShowAnswers) => !prevShowAnswers);
  };

  return (
    <li className={styles["question-item"]}>
      <ListItem title={props.title} onClick={toggleQuestionHandler} />
      {showAnswers && (
        <ul>
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
