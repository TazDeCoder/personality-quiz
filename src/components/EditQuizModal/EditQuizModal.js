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
  ////// (+ adding side-effects)
  ///////////////////////////////////////////////

  const quizCtx = useContext(QuizContext);

  const [error, setError] = useState(null);
  const [isQuizModified, setIsQuizModified] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showTypeForm, setShowTypeForm] = useState(false);
  const [modifiedQuestions, setModifiedQuestions] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState(quizCtx.questions);
  const [quizTypes, setQuizTypes] = useState(quizCtx.types);

  // SIDE-EFFECTS

  useEffect(() => {
    if (modifiedQuestions.length === 0) setIsQuizModified(false);
    else setIsQuizModified(true);
  }, [modifiedQuestions]);

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
      ...quizCtx,
      title: inputQuizData.title,
      desc: inputQuizData.description,
    };
    console.log(quizData);
    // Update current quiz with quiz data
    quizCtx.updateQuiz(quizData);
    // Create updated quiz data object
    const updatedQuizData = {
      ...inputQuizData,
      questions: quizCtx.questions,
      types: quizCtx.types,
    };
    // Handle updated quiz data
    props.onUpdateQuiz(updatedQuizData, quizCtx.id);
  };

  const addTypeHandler = (newType) => {
    // Create quiz data object
    const quizData = {
      ...quizCtx,
      types: [...quizTypes, newType],
    };
    // Update current quiz with quiz data
    quizCtx.updateQuiz(quizData);
    // Create updated quiz data object
    const updatedQuizData = {
      title: quizCtx.title,
      description: quizCtx.desc,
      questions: quizCtx.questions,
      types: [...quizTypes, newType],
    };
    // Handle updated quiz data
    props.onUpdateQuiz(updatedQuizData, quizCtx.id);
    // Update quiz types state
    setQuizTypes((prevTypes) => {
      const updatedTypes = prevTypes.concat(newType);
      return updatedTypes;
    });
  };

  const addQuestionHandler = (newQuestion) => {
    // Create quiz data object
    const quizData = {
      ...quizCtx,
      questions: [...quizQuestions, newQuestion],
    };
    // Update current quiz with quiz data
    quizCtx.updateQuiz(quizData);
    // Create updated quiz data object
    const updatedQuizData = {
      title: quizCtx.title,
      description: quizCtx.desc,
      questions: [...quizQuestions, newQuestion],
      types: quizCtx.types,
    };
    // Handle updated quiz data
    props.onUpdateQuiz(updatedQuizData, quizCtx.id);
    // Update quiz questions state
    setQuizQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.concat(newQuestion);
      return updatedQuestions;
    });
  };

  const removeQuestionHandler = (questionId) => {
    // Checking if question already exists
    const existingQuestionIdx = quizQuestions.findIndex(
      (question) => question.id === questionId
    );
    if (existingQuestionIdx === -1) return;
    // Create quiz data object
    const quizData = {
      ...quizCtx,
      questions: quizQuestions.splice(existingQuestionIdx, 1),
    };
    // Update current quiz with quiz data
    quizCtx.updateQuiz(quizData);
    // Create updated quiz data object
    const updatedQuizData = {
      title: quizCtx.title,
      description: quizCtx.desc,
      questions: quizQuestions.splice(existingQuestionIdx, 1),
      types: quizCtx.types,
    };
    // Handle updated quiz data
    props.onUpdateQuiz(updatedQuizData, quizCtx.id);
    // Update quiz questions state
    setQuizQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(existingQuestionIdx, 1);
      return updatedQuestions;
    });
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
        (question) => question.id === questionId
      );
      if (existingQuestionIdx === -1) return prevQuestions;
      // Remove question from modified questions state
      const updatedQuestions = [...prevQuestions];
      updatedQuestions.splice(existingQuestionIdx, 1);
      return updatedQuestions;
    });
  };

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
          questions={quizQuestions}
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
        <li key={question.id}>
          <ListItem title={question.prompt} />
          <Button
            onClick={removeModifiedQuestionHandler.bind(null, question.id)}
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
