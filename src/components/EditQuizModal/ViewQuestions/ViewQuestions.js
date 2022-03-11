import styles from "./ViewQuestions.module.css";
// COMPONENTS
import QuestionItem from "./QuestionItem";

function ViewQuestions(props) {
  const questionsContent =
    props.questions.length > 0 ? (
      props.questions.map((question, idx) => {
        return (
          <QuestionItem
            key={question.id}
            title={`Q${idx + 1}: ${question.prompt}`}
            answers={question.answers}
            onRemove={props.onRemoveQuestion.bind(null, question.id)}
          />
        );
      })
    ) : (
      <p>No questions found.</p>
    );

  return (
    <div className={styles["view-questions"]}>
      <h1>Questions</h1>
      <ul>{questionsContent}</ul>
    </div>
  );
}

export default ViewQuestions;
