import { useState, useEffect, useContext } from "react";

import styles from "./EditQuizModal.module.css";
// COMPONENTS
import QuizForm from "./AddQuestionForm/AddQuestionForm";
import TypeForm from "./AddTypeForm/AddTypeForm";
import ViewQuestions from "./ViewQuestions/ViewQuestions";
// --- UI ---
import ErrorModal from "../UI/ErrorModal/ErrorModal";
import Modal from "../UI/Modal/Modal";
import Button from "../UI/Button/Button";
import ListItem from "../UI/ListItem/ListItem";
import RemoveIcon from "../UI/Icons/RemoveIcon";
import ArrowLeft from "../UI/Icons/ArrowLeft";
// CONTEXTS
import QuizContext from "../../store/quiz-context";
import UpdateQuizForm from "./UpdateQuizForm/UpdateQuizForm";

function EditQuiz(props) {
  let modalContent;

  ////////////////////////////////////////////////
  ////// Declaring states and context
  ///////////////////////////////////////////////

  const quizCtx = useContext(QuizContext);

  const [error, setError] = useState(null);

  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showTypeForm, setShowTypeForm] = useState(false);

  const [modifiedQuestions, setModifiedQuestions] = useState([]);

  const [isQuizModified, setIsQuizModified] = useState(false);

  ////////////////////////////////////////////////
  ////// Event handlers
  ///////////////////////////////////////////////

  // ERROR HANDLERS

  const errorHandler = (error) => {
    setError({ ...error });
  };

  const confirmErrorHandler = (e) => {
    setError(null);
  };

  // TOGGLE HANDLERS

  const toggleTypeFormHandler = () => {
    setShowTypeForm((prevTypeForm) => !prevTypeForm);
  };

  const toggleQuestionFormHandler = () => {
    setShowQuestionForm((prevQuestionForm) => !prevQuestionForm);
  };

  // PROPS HANDLERS

  const updateQuizDataHandler = (inputQuizData) => {
    // Create quiz data object
    const quizData = {
      title: inputQuizData.title,
      desc: inputQuizData.description,
    };
    // Update quiz context state with quiz data
    quizCtx.updateQuiz(quizData);
    // Create updated quiz data object
    const updatedQuizData = {
      ...inputQuizData,
      questions: quizCtx.questions,
      types: quizCtx.types,
    };
    // Handle updated quiz data
    props.onUpdateQuiz(quizCtx.id, updatedQuizData);
  };

  const addTypeHandler = (newType) => {
    const updatedTypes = [...quizCtx.types, newType];
    // Create quiz data object
    const quizData = {
      types: updatedTypes,
    };
    // Update quiz context state with quiz data
    quizCtx.updateQuiz(quizData);
    // Create updated quiz data object
    const updatedQuizData = {
      title: quizCtx.title,
      description: quizCtx.desc,
      questions: quizCtx.questions,
      types: updatedTypes,
    };
    // Handle updated quiz data
    props.onUpdateQuiz(quizCtx.id, updatedQuizData);
  };

  const addQuestionHandler = (newQuestion) => {
    const updatedQuestions = [...quizCtx.questions, newQuestion];
    // Create quiz data object
    const quizData = {
      questions: updatedQuestions,
    };
    // Update quiz context state with quiz data
    quizCtx.updateQuiz(quizData);
    // Create updated quiz data object
    const updatedQuizData = {
      title: quizCtx.title,
      description: quizCtx.desc,
      questions: updatedQuestions,
      types: quizCtx.types,
    };
    // Handle updated quiz data
    props.onUpdateQuiz(quizCtx.id, updatedQuizData);
  };

  const removeQuestionHandler = (questionId) => {
    const updatedQuestions = quizCtx.questions.filter(
      (question) => question._id !== questionId
    );
    // Create quiz data object
    const quizData = {
      ...quizCtx,
      questions: updatedQuestions,
    };
    // Update current quiz with quiz data
    quizCtx.updateQuiz(quizData);
    // Create updated quiz data object
    const updatedQuizData = {
      title: quizCtx.title,
      description: quizCtx.desc,
      questions: updatedQuestions,
      types: quizCtx.types,
    };
    // Handle updated quiz data
    props.onUpdateQuiz(quizCtx.id, updatedQuizData);
  };

  // STATE UPDATING HANDLERS

  const updateModifiedQuestionsHandler = (newModifiedQuestion) => {
    setModifiedQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.concat(newModifiedQuestion);
      return updatedQuestions;
    });
  };

  const removeModifiedQuestionHandler = (questionId) => {
    setModifiedQuestions((prevQuestions) => {
      // Checking if question already exists
      const existingQuestionIdx = prevQuestions.findIndex(
        (question) => question._id === questionId
      );
      if (existingQuestionIdx === -1) return prevQuestions;
      // Remove question from modified questions state
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(existingQuestionIdx, 1);
      return updatedQuestions;
    });
  };

  useEffect(() => {
    if (modifiedQuestions.length === 0) setIsQuizModified(false);
    else setIsQuizModified(true);
  }, [modifiedQuestions]);

  ////////////////////////////////////////////////
  ////// Defining conditonal JSX content
  ///////////////////////////////////////////////

  if (!showQuestionForm && !showTypeForm) {
    modalContent = (
      <>
        <button
          className={styles["edit-quiz-modal__btn--close"]}
          onClick={props.onClose}
        >
          &times;
        </button>

        <header className={styles["edit-quiz-modal__header"]}>
          <h1>Editting Quiz</h1>
        </header>

        <UpdateQuizForm
          title={quizCtx.title}
          desc={quizCtx.desc}
          onUpdateQuizData={updateQuizDataHandler}
        />

        <ViewQuestions
          onRemoveQuestion={removeQuestionHandler}
          onError={errorHandler}
        />

        <div className={styles["edit-quiz-modal__actions"]}>
          <Button onClick={toggleTypeFormHandler}>Add New Type</Button>
          <Button onClick={toggleQuestionFormHandler}>Add New Question</Button>
        </div>
      </>
    );
  }

  if (showQuestionForm) {
    let listContent;

    if (modifiedQuestions.length > 0) {
      listContent = modifiedQuestions.map((question) => (
        <li key={question._id}>
          <ListItem title={question.prompt} />
          <Button
            onClick={removeModifiedQuestionHandler.bind(null, question._id)}
          >
            <RemoveIcon />
          </Button>
        </li>
      ));
    }

    modalContent = (
      <>
        <button
          className={styles["edit-quiz-modal__btn--close"]}
          onClick={toggleQuestionFormHandler}
        >
          <ArrowLeft />
        </button>

        <header className={styles["edit-quiz-modal__header"]}>
          <h1>Create New Question</h1>
        </header>

        <ul className={styles["edit-quiz-modal__list"]}>{listContent}</ul>

        <QuizForm
          isQuizModified={isQuizModified}
          onAddQuestion={addQuestionHandler}
          onUpdateModifiedQuestions={updateModifiedQuestionsHandler}
          onClose={toggleQuestionFormHandler}
          onError={errorHandler}
        />
      </>
    );
  }

  if (showTypeForm) {
    modalContent = (
      <>
        <button
          className={styles["edit-quiz-modal__btn--close"]}
          onClick={toggleTypeFormHandler}
        >
          <ArrowLeft />
        </button>

        <header className={styles["edit-quiz-modal__header"]}>
          <h1>Create New Type</h1>
        </header>

        <TypeForm
          onAddType={addTypeHandler}
          onClose={toggleTypeFormHandler}
          onError={errorHandler}
        />
      </>
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
      <Modal className={styles["edit-quiz-modal"]}>{modalContent}</Modal>
    </>
  );
}

export default EditQuiz;
