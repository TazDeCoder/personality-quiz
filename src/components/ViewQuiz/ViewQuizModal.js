import { useContext } from "react";

import styles from "./ViewQuizModal.module.css";
// COMPONENTS
import Button from "../UI/Button/Button";
import Modal from "../UI/Modal/Modal";
// CONTEXTS
import UserContext from "../../store/user-context";
import QuizContext from "../../store/quiz-context";

function ViewQuiz(props) {
  const userCtx = useContext(UserContext);
  const quizCtx = useContext(QuizContext);

  const isUserValid =
    (userCtx.isLoggedIn && userCtx.username === quizCtx.author) ||
    userCtx.isAdmin;

  return (
    <Modal className={styles["view-quiz-modal"]} onClose={props.onClose}>
      {isUserValid && (
        <div className={styles["view-quiz-modal__remove"]}>
          <Button onClick={props.onRemoveQuiz.bind(null, quizCtx.id)}>
            Remove Quiz
          </Button>
        </div>
      )}

      <div className={styles["view-quiz-modal__content"]}>
        <h1>{quizCtx.title}</h1>
        <p>{quizCtx.desc}</p>
      </div>

      <div className={styles["view-quiz-modal__meta"]}>
        <p>
          Number of questions: <span>{quizCtx.questions.length}</span>
        </p>
        <p>
          Created By: <span>{quizCtx.author}</span>
        </p>
      </div>

      <div className={styles["view-quiz-modal__actions"]}>
        {isUserValid && <Button onClick={props.onEditQuiz}>Edit Quiz</Button>}
        <Button
          disabled={quizCtx.questions.length === 0}
          onClick={props.onStartQuiz}
        >
          Start Quiz
        </Button>
      </div>
    </Modal>
  );
}

export default ViewQuiz;
