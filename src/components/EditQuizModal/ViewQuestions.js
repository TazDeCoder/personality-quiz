import QuestionItem from "./QuestionItem";
import styles from "./ViewQuestions.module.css";

function ViewQuestions(props) {
  return (
    <div className={styles["view-questions"]}>
      <h1>Current Questions</h1>
      <ul>
        {props.questions.map((question, idx) => {
          return (
            <QuestionItem
              key={question.id}
              title={`Q${idx + 1}: ${question.prompt}`}
              answers={question.answers}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ViewQuestions;
