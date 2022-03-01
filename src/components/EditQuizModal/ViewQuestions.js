import QuestionItem from "./QuestionItem";
import styles from "./ViewQuestions.module.css";

function ViewQuestions(props) {
  const removeHandler = (id) => {
    props.onRemove(id);
  };

  return (
    <div className={styles["view-questions"]}>
      <h1>Current Questions</h1>
      <ul>
        {props.questions.length > 0 ? (
          props.questions.map((question, idx) => {
            return (
              <QuestionItem
                key={question.id}
                title={`Q${idx + 1}: ${question.prompt}`}
                answers={question.answers}
                onRemove={removeHandler.bind(null, question.id)}
              />
            );
          })
        ) : (
          <p>No questions found.</p>
        )}
      </ul>
    </div>
  );
}

export default ViewQuestions;
