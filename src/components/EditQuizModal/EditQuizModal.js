import { useState, useContext } from "react";

import ErrorModal from "../UI/ErrorModal";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import QuizForm from "./AddQuestionForm";
import TypeForm from "./AddTypeForm";
import QuizContext from "../../store/quiz-context";

function EditQuiz(props) {
  let modalContent;

  const quizCtx = useContext(QuizContext);

  const [error, setError] = useState();
  const [quizQuestions, setQuizQuestions] = useState(quizCtx.questions);
  const [quizTypes, setQuizTypes] = useState(quizCtx.types);
  const [showTypeForm, setShowTypeForm] = useState(false);

  const errorHandler = (error) => {
    setError({ ...error });
  };

  const confirmErrorHandler = (e) => {
    setError(null);
  };

  const toggleTypeFormHandler = () => {
    setShowTypeForm((prevTypeForm) => !prevTypeForm);
  };

  const addNewTypeHandler = (newType) => {
    // Create new quiz data object
    const quizData = {
      ...quizCtx,
      types: [...quizTypes, newType],
    };
    // Update neccessary state
    setQuizTypes(quizData.types);
    // Handle updating quiz
    quizCtx.updateQuiz(quizData);
    props.onUpdateQuiz(quizCtx.id, quizData);
  };

  const addNewQuestionHandler = (newQuestion) => {
    // Create new quiz data object
    const quizData = {
      ...quizCtx,
      questions: [...quizQuestions, newQuestion],
    };
    // Update neccessary state
    setQuizQuestions(quizData.questions);
    // Handle updating quiz
    quizCtx.updateQuiz(quizData);
    props.onUpdateQuiz(quizCtx.id, quizData);
  };

  if (!showTypeForm) {
    modalContent = (
      <Modal>
        <QuizForm
          onAddNewQuestion={addNewQuestionHandler}
          onClose={props.onClose}
          onError={errorHandler}
        />
        <Button onClick={toggleTypeFormHandler}>Add New Type</Button>
      </Modal>
    );
  }

  if (showTypeForm) {
    modalContent = (
      <Modal>
        <TypeForm
          onAddNewType={addNewTypeHandler}
          onClose={toggleTypeFormHandler}
          onError={errorHandler}
        />
        <Button onClick={toggleTypeFormHandler}>Close</Button>
      </Modal>
    );
  }

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={confirmErrorHandler}
        />
      )}
      {modalContent}
    </>
  );
}

export default EditQuiz;