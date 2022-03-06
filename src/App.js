import { useState, useEffect, useContext, useCallback } from "react";

// COMPONENTS
import MainHeader from "./components/MainHeader/MainHeader";
import Quizzes from "./components/Quizzes/Quizzes";
import AddQuiz from "./components/AddQuiz/AddQuiz";
import ViewQuiz from "./components/ViewQuiz/ViewQuiz";
import EditQuizModal from "./components/EditQuizModal/EditQuizModal";
import StartQuiz from "./components/StartQuiz/StartQuiz";
import QuizResults from "./components/QuizResults/QuizResults";
// --- UI ---
import Modal from "./components/UI/Modal/Modal";
import ErrorModal from "./components/UI/ErrorModal/ErrorModal";
// CONTEXTS
import QuizProvider from "./store/QuizProvider";
import QuizContext from "./store/quiz-context";

function App() {
  let mainContent, modalContent;

  ////////////////////////////////////////////////
  ////// Declaring states and context
  ////// (+ adding side-effects)
  ///////////////////////////////////////////////

  const quizCtx = useContext(QuizContext);

  const [error, setError] = useState(null);

  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showViewQuiz, setShowViewQuiz] = useState(false);
  const [showEditQuiz, setShowEditQuiz] = useState(false);
  const [showStartQuiz, setShowStartQuiz] = useState(false);
  const [showQuizResults, setShowQuizResults] = useState(false);

  useEffect(() => {
    if (!showStartQuiz) setShowViewQuiz(false);
  }, [showStartQuiz]);

  useEffect(() => {
    if (!showQuizResults) setShowStartQuiz(false);
  }, [showQuizResults]);

  const [quizzes, setQuizzes] = useState([]);
  const [quizResults, setQuizResults] = useState();

  ////////////////////////////////////////////////
  ////// Event handlers
  ///////////////////////////////////////////////

  // ERROR HANDLERS

  const errorHandler = (error) => {
    setError({ ...error });
  };

  const confirmErrorHandler = () => {
    setError(null);
  };

  // HTTP REQUEST HANDLERS

  const fetchQuizzesHandler = useCallback(async () => {
    setError(null);

    try {
      const response = await fetch("/api/quizzes");

      if (!response.ok) {
        const err = new Error("Failed to fetch quizzes");
        err.status = response.status;
        throw err;
      }

      const data = await response.json();

      const transformedQuizzes = data.quizList.map((quizData) => {
        return {
          id: quizData._id,
          title: quizData.title,
          author: quizData.created_by.username,
        };
      });

      setQuizzes(transformedQuizzes);
    } catch (err) {
      setError({
        title: `Something went wrong! (${err.status})`,
        message: err.message,
      });
    }
  }, []);

  useEffect(() => {
    fetchQuizzesHandler();
  }, [fetchQuizzesHandler]);

  // TOGGLE HANDLERS

  const toggleQuizFormHandler = () => {
    setShowQuizForm((prevShowQuizForm) => !prevShowQuizForm);
  };

  const toggleQuizResultsHandler = () => {
    setShowQuizResults((prevShowQuizResults) => !prevShowQuizResults);
  };

  // SHOW/CLOSE HANDLERS

  const showViewQuizHandler = () => {
    setShowViewQuiz(true);
  };

  const closeViewQuizHandler = () => {
    setShowViewQuiz(false);
  };

  const showEditQuizHandler = () => {
    setShowEditQuiz(true);
  };

  const closeEditQuizHandler = () => {
    setShowEditQuiz(false);
  };

  const showStartQuizHandler = () => {
    setShowStartQuiz(true);
  };

  const closeStartQuizHandler = () => {
    setShowStartQuiz(false);
  };

  // PROPS HANDLERS

  const addQuizHandler = (newQuiz) => {
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = prevQuizzes.concat(newQuiz);
      return updatedQuizzes;
    });
  };

  const updateQuizHandler = (quizData) => {
    setQuizzes((prevQuizzes) => {
      // Checking if quiz already exists
      const existingQuizIdx = prevQuizzes.findIndex(
        (quiz) => quiz.id === quizCtx.id
      );
      if (existingQuizIdx === -1) return;
      // Update quiz from quizzes state
      const updatedQuizzes = [...prevQuizzes];
      updatedQuizzes[existingQuizIdx] = { ...quizData };
      return updatedQuizzes;
    });
  };

  const removeQuizHandler = (quizId) => {
    setQuizzes((prevQuizzes) => {
      // Checking if quiz already exists
      const existingQuizIdx = quizzes.findIndex((quiz) => quiz.id === quizId);
      if (existingQuizIdx === -1) return;
      // Remove quiz from quizzes state
      const updatedQuizzes = [...prevQuizzes];
      updatedQuizzes.splice(existingQuizIdx, 1);
      return updatedQuizzes;
    });
    setShowViewQuiz(false);
  };

  const submitQuizResultsHandler = (quizResults) => {
    setQuizResults(quizResults);
    setShowQuizResults(true);
  };

  ////////////////////////////////////////////////
  ////// Defining conditonal JSX content
  ///////////////////////////////////////////////

  if (error) {
    modalContent = (
      <ErrorModal
        title={error.title}
        message={error.message}
        onConfirm={confirmErrorHandler}
      />
    );
  }

  if (showQuizForm) {
    modalContent = (
      <Modal onClose={toggleQuizFormHandler}>
        <AddQuiz onAddQuiz={addQuizHandler} onClose={toggleQuizFormHandler} />
      </Modal>
    );
  }

  if (showViewQuiz && !showEditQuiz && !showStartQuiz) {
    modalContent = (
      <Modal onClose={closeViewQuizHandler}>
        <ViewQuiz
          onEditQuiz={showEditQuizHandler}
          onStartQuiz={showStartQuizHandler}
          onRemoveQuiz={removeQuizHandler}
        />
      </Modal>
    );
  }

  if (showEditQuiz) {
    modalContent = (
      <EditQuizModal
        onUpdateQuiz={updateQuizHandler}
        onClose={closeEditQuizHandler}
      />
    );
  }

  if (showQuizResults) {
    modalContent = (
      <Modal onClose={toggleQuizResultsHandler}>
        <QuizResults type={quizResults} onClose={toggleQuizResultsHandler} />
      </Modal>
    );
  }

  if (showStartQuiz) {
    mainContent = (
      <StartQuiz
        onSubmitQuizResults={submitQuizResultsHandler}
        onClose={closeStartQuizHandler}
      />
    );
  }

  if (!showStartQuiz) {
    mainContent = (
      <Quizzes
        items={quizzes}
        onViewQuiz={showViewQuizHandler}
        onError={errorHandler}
      />
    );
  }

  return (
    <QuizProvider>
      {modalContent}
      <MainHeader
        startQuiz={showStartQuiz}
        onToggleQuizForm={toggleQuizFormHandler}
        onClose={closeStartQuizHandler}
      />
      <main>{mainContent}</main>
    </QuizProvider>
  );
}

export default App;
