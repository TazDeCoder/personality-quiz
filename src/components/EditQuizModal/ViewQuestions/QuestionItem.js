import { useState } from "react";

import styles from "./QuestionItem.module.css";
// COMPONENTS
import ListItem from "../../UI/ListItem/ListItem";
import Button from "../../UI/Button/Button";
import RemoveIcon from "../../UI/Icons/RemoveIcon";

function QuestionItem(props) {
  let answersContent;

  const [showAnswers, setShowAnswers] = useState(false);

  const toggleQuestionHandler = () => {
    setShowAnswers((prevShowAnswers) => !prevShowAnswers);
  };

  if (showAnswers) {
    answersContent = (
      <ul className={styles["question-item__answers"]}>
        {props.answers.map((answer) => (
          <li key={answer._id}>
            <ListItem title={answer.text} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <li className={styles["question-item"]}>
      <div className={styles["question-item__prompt"]}>
        <ListItem title={props.title} onClick={toggleQuestionHandler} />
        <Button onClick={props.onRemove}>
          <RemoveIcon />
        </Button>
      </div>
      {answersContent}
    </li>
  );
}
export default QuestionItem;
