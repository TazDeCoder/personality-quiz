import { useContext } from "react";

import styles from "./ViewQuestions.module.css";
// COMPONENTS
import QuestionItem from "./QuestionItem";
// CONTEXT
import QuizContext from "../../../store/quiz-context";

function ViewQuestions(props) {
  const quizCtx = useContext(QuizContext);

  const questionsContent =
    quizCtx.questions.length > 0 ? (
      quizCtx.questions.map((question, idx) => {
        return (
          <QuestionItem
            key={question._id}
            title={`Q${idx + 1}: ${question.prompt}`}
            answers={question.answers}
            onRemove={props.onRemoveQuestion.bind(null, question._id)}
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
