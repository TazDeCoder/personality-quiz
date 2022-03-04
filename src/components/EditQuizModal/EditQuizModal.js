import { useState, useContext } from "react";

import styles from "./EditQuizModal.module.css";
import ErrorModal from "../UI/ErrorModal/ErrorModal";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import QuizForm from "./AddQuestionForm/AddQuestionForm";
import TypeForm from "./AddTypeForm/AddTypeForm";
import QuizContext from "../../store/quiz-context";
import ViewQuestions from "./ViewQuestions/ViewQuestions";
import ListItem from "../UI/ListItem/ListItem";
import RemoveIcon from "../UI/Icons/RemoveIcon";

function EditQuiz(props) {
  let modalContent;

  const quizCtx = useContext(QuizContext);

  const [error, setError] = useState();
  const [modifiedQuestions, setModifiedQuestions] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState(quizCtx.questions);
  const [quizTypes, setQuizTypes] = useState(quizCtx.types);
  const [showTypeForm, setShowTypeForm] = useState(false);
  const [showViewQuestions, setShowViewQuestions] = useState(false);

  const errorHandler = (error) => {
    setError({ ...error });
  };

  const confirmErrorHandler = (e) => {
    setError(null);
  };

  const toggleTypeFormHandler = () => {
    setShowTypeForm((prevTypeForm) => !prevTypeForm);
  };

  const toggleViewQuestionsHandler = () => {
    setShowViewQuestions((prevViewQuestions) => !prevViewQuestions);
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
    // Check if quiz exists in modified before adding
    const existingQuizIdx = modifiedQuestions.findIndex(
      (question) => question.id === newQuestion.id
    );
    if (existingQuizIdx === -1) return;
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

  const removeQuestionHandler = (id) => {
    // Check if quiz exists before removing
    const existingQuizIdx = quizQuestions.findIndex(
      (question) => question.id === id
    );
    if (existingQuizIdx === -1) return;
    // Filter out removed question
    const updatedQuestions = quizQuestions.filter(
      (question) => question.id !== id
    );
    // Create new quiz data object
    const quizData = {
      ...quizCtx,
      questions: [...updatedQuestions],
    };
    // Update neccessary state
    setQuizQuestions(quizData.questions);
    // Handle updating quiz
    quizCtx.updateQuiz(quizData);
    props.onUpdateQuiz(quizCtx.id, quizData);
  };

  const updateModifiedQuestionsHandler = (newQuestion) => {
    setModifiedQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.concat(newQuestion);
      return updatedQuestions;
    });
  };

  const removeModifiedQuestionHandler = (id) => {
    setModifiedQuestions((prevQuestions) => {
      // Check if quiz exists before removing
      const existingQuizIdx = prevQuestions.findIndex(
        (question) => question.id === id
      );
      if (existingQuizIdx === -1) return prevQuestions;
      // Filter out removed question
      const updatedQuestions = prevQuestions.filter(
        (question) => question.id !== id
      );
      return updatedQuestions;
    });
  };

  if (!showTypeForm && !showViewQuestions) {
    modalContent = (
      <Modal>
        <button
          className={styles["edit-quiz-modal__btn--close"]}
          onClick={props.onClose}
        >
          &times;
        </button>

        <header className={styles["edit-quiz-modal__header"]}>
          <h1>Create New Question</h1>
        </header>

        {modifiedQuestions.length > 0 && (
          <ul className={styles["edit-quiz-modal__list"]}>
            {modifiedQuestions.map((question) => (
              <li key={question.id}>
                <ListItem title={question.prompt} />
                <Button
                  onClick={removeModifiedQuestionHandler.bind(
                    null,
                    question.id
                  )}
                >
                  <RemoveIcon />
                </Button>
              </li>
            ))}
          </ul>
        )}

        <QuizForm
          onAddNewQuestion={addNewQuestionHandler}
          onUpdateModifiedQuestions={updateModifiedQuestionsHandler}
          onClose={props.onClose}
          onError={errorHandler}
        />

        <div className={styles["edit-quiz-modal__actions"]}>
          <Button onClick={toggleTypeFormHandler}>Add New Type</Button>
          <Button onClick={toggleViewQuestionsHandler}>View Questions</Button>
        </div>
      </Modal>
    );
  }

  if (showTypeForm) {
    modalContent = (
      <Modal>
        <button
          className={styles["edit-quiz-modal__btn--close"]}
          onClick={toggleTypeFormHandler}
        >
          &times;
        </button>

        <header className={styles["edit-quiz-modal__header"]}>
          <h1>Create New Type</h1>
        </header>

        <TypeForm
          onAddNewType={addNewTypeHandler}
          onClose={toggleTypeFormHandler}
          onError={errorHandler}
        />
      </Modal>
    );
  }

  if (showViewQuestions) {
    modalContent = (
      <Modal>
        <button
          className={styles["edit-quiz-modal__btn--close"]}
          onClick={toggleViewQuestionsHandler}
        >
          &times;
        </button>

        <header className={styles["edit-quiz-modal__header"]}>
          <h1>Current Questions</h1>
        </header>

        <ViewQuestions
          questions={quizQuestions}
          onClose={toggleViewQuestionsHandler}
          onError={errorHandler}
          onRemove={removeQuestionHandler}
        />
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
