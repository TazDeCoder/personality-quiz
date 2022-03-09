import { useState, useEffect, useContext, useCallback } from "react";

// COMPONENTS
import MainHeader from "./components/MainHeader/MainHeader";
import Quizzes from "./components/Quizzes/Quizzes";
import AddQuiz from "./components/AddQuiz/AddQuiz";
import ViewQuizModal from "./components/ViewQuiz/ViewQuizModal";
import EditQuizModal from "./components/EditQuizModal/EditQuizModal";
import StartQuiz from "./components/StartQuiz/StartQuiz";
import QuizResults from "./components/QuizResults/QuizResults";
import Login from "./components/Login/Login";
// --- UI ---
import Modal from "./components/UI/Modal/Modal";
import ErrorModal from "./components/UI/ErrorModal/ErrorModal";
// STORES
import UserContext from "./store/user-context";
import QuizProvider from "./store/QuizProvider";
import QuizContext from "./store/quiz-context";

function App() {
  let mainContent, modalContent;

  ////////////////////////////////////////////////
  ////// Declaring states and context
  ////// (+ adding side-effects)
  ///////////////////////////////////////////////

  const userCtx = useContext(UserContext);
  const quizCtx = useContext(QuizContext);

  const [error, setError] = useState(null);

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
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

  const toggleLoginFormHandler = () => {
    setShowLoginForm((prevShowLoginForm) => !prevShowLoginForm);
  };

  const toggleSignupFormHandler = () => {
    setShowSignupForm((prevShowSignupForm) => !prevShowSignupForm);
  };

  const toggleQuizFormHandler = () => {
    setShowQuizForm((prevShowQuizForm) => !prevShowQuizForm);
  };

  const toggleViewQuizHandler = () => {
    setShowViewQuiz((prevShowViewQuiz) => !prevShowViewQuiz);
  };

  const toggleEditQuizHandler = () => {
    setShowEditQuiz((prevEditViewQuiz) => !prevEditViewQuiz);
  };

  const toggleStartQuizHandler = () => {
    setShowStartQuiz((prevShowStartQuiz) => !prevShowStartQuiz);
  };

  const toggleQuizResultsHandler = () => {
    setShowQuizResults((prevShowQuizResults) => !prevShowQuizResults);
  };

  // PROPS HANDLERS

  const addQuizHandler = async (newQuiz) => {
    const response = await fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify(newQuiz),
      headers: {
        Authorization: `bearer ${userCtx.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setError({
        title: `Something went wrong! (${response.status})`,
        message: "Failed to add quiz. Try again!",
      });
    }

    // SUCCESS. Fetch quizzes
    fetchQuizzesHandler();
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

  const removeQuizHandler = async (quizId) => {
    // Checking if quiz already exists
    const existingQuizIdx = quizzes.findIndex((quiz) => quiz.id === quizId);
    if (existingQuizIdx === -1) return;
    // Remove quiz from quiz
    const response = await fetch(`/api/quiz/${quizId}`, {
      method: "DELETE",
      headers: {
        Authorization: `bearer ${userCtx.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setError({
        title: `Something went wrong! (${response.status})`,
        message: "Failed to add quiz. Try again!",
      });
    }

    setShowViewQuiz(false);

    // SUCCESS. Fetch quizzes
    fetchQuizzesHandler();
  };

  const submitQuizResultsHandler = (quizResults) => {
    setQuizResults(quizResults);
    setShowQuizResults(true);
  };

  ////////////////////////////////////////////////
  ////// Defining conditonal JSX content
  ///////////////////////////////////////////////

  if (showLoginForm) {
    modalContent = (
      <Modal onClose={toggleLoginFormHandler}>
        <Login onClose={toggleLoginFormHandler} onError={errorHandler} />
      </Modal>
    );
  }

  if (showSignupForm) {
    modalContent = <Modal onClose={toggleSignupFormHandler}></Modal>;
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
      <ViewQuizModal
        onEditQuiz={toggleEditQuizHandler}
        onStartQuiz={toggleStartQuizHandler}
        onRemoveQuiz={removeQuizHandler}
        onClose={toggleViewQuizHandler}
      />
    );
  }

  if (showEditQuiz) {
    modalContent = (
      <EditQuizModal
        onUpdateQuiz={updateQuizHandler}
        onClose={toggleEditQuizHandler}
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

  if (error) {
    modalContent = (
      <ErrorModal
        title={error.title}
        message={error.message}
        onConfirm={confirmErrorHandler}
      />
    );
  }

  if (showStartQuiz) {
    mainContent = (
      <StartQuiz
        onSubmitQuizResults={submitQuizResultsHandler}
        onClose={toggleStartQuizHandler}
      />
    );
  }

  if (!showStartQuiz) {
    mainContent = (
      <Quizzes
        items={quizzes}
        onViewQuiz={toggleViewQuizHandler}
        onError={errorHandler}
      />
    );
  }

  return (
    <QuizProvider>
      {modalContent}
      <MainHeader
        startQuiz={showStartQuiz}
        onToggleLoginForm={toggleLoginFormHandler}
        onToggleSignupForm={toggleSignupFormHandler}
        onToggleQuizForm={toggleQuizFormHandler}
        onClose={toggleStartQuizHandler}
      />
      <main>{mainContent}</main>
    </QuizProvider>
  );
}

export default App;
