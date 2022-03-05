import { useState, useEffect, useContext } from "react";

import MainHeader from "./components/MainHeader/MainHeader";
import Quizzes from "./components/Quizzes/Quizzes";
import AddQuiz from "./components/AddQuiz/AddQuiz";
import Modal from "./components/UI/Modal/Modal";
import ViewQuiz from "./components/ViewQuiz/ViewQuiz";
import EditQuizModal from "./components/EditQuizModal/EditQuizModal";
import StartQuiz from "./components/StartQuiz/StartQuiz";
import QuizResults from "./components/QuizResults/QuizResults";
import QuizProvider from "./store/QuizProvider";
import QuizContext from "./store/quiz-context";

const SAMPLE_QUIZZES = [
  {
    id: Math.random().toString(),
    title: "Test Quiz 1",
    author: "Dev",
    desc: "Lorem ipsum dolor sit amet, id sale regione iuvaret pro. Usu an doming omnium scripserit, sed ne quod iusto salutatus. At eam enim eruditi expetendis, eu eos aperiri appareat signiferumque. Eum melius accommodare id, an his assum dolore. Eu mea facer soluta constituto, ei probo nonumy sit. Eu his dicta nihil dolorum, mei ea salutandi qualisque. Solum viderer vim at, habemus philosophia cu nam. Usu assum ocurreret percipitur at. Te detracto voluptatum liberavisse vim, ei pri minimum nostrum. Ad putant forensibus mei. Eu affert aeterno urbanitas cum, est idque movet iudico eu. Ea tractatos complectitur sit, an harum repudiandae sea. Vel ignota menandri eloquentiam ea, duo ut ullum nostrud fastidii, eu mea stet feugiat. Deleniti hendrerit pro ne, nec veritus efficiendi cu, an appetere patrioque nam. Eu vide.",
    questions: [
      {
        id: Math.random().toString(),
        prompt: "What is your favourite color",
        answers: [
          {
            id: Math.random().toString(),
            text: "Yellow",
            types: ["yellow"],
          },
          {
            id: Math.random().toString(),
            text: "Blue",
            types: ["blue"],
          },
          {
            id: Math.random().toString(),
            text: "Red",
            types: ["red"],
          },
          {
            id: Math.random().toString(),
            text: "Green",
            types: ["green"],
          },
        ],
      },
    ],
    types: [
      { title: "Yellow", desc: "Banana" },
      { title: "Blue", desc: "Blueberry" },
      { title: "Red", desc: "Strawberry" },
      { title: "Green", desc: "Apple" },
    ],
  },
];

function App() {
  let mainContent, modalContent;
  // Retrive any saved quizzes in localStorage
  const quizzesStorage = localStorage.getItem("quizzes");

  ////////////////////////////////////////////////
  ////// Declaring states and context
  ////// (+ adding side-effects)
  ///////////////////////////////////////////////

  const quizCtx = useContext(QuizContext);

  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showViewQuiz, setShowViewQuiz] = useState(false);
  const [showEditQuiz, setShowEditQuiz] = useState(false);
  const [showStartQuiz, setShowStartQuiz] = useState(false);
  const [showQuizResults, setShowQuizResults] = useState(false);

  const [quizzes, setQuizzes] = useState(
    quizzesStorage ? JSON.parse(quizzesStorage) : SAMPLE_QUIZZES
  );
  const [quizResults, setQuizResults] = useState();

  useEffect(() => {
    if (!showStartQuiz) setShowViewQuiz(false);
  }, [showStartQuiz]);

  useEffect(() => {
    if (!showQuizResults) setShowStartQuiz(false);
  }, [showQuizResults]);

  useEffect(() => {
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  ////////////////////////////////////////////////
  ////// Event handlers
  ///////////////////////////////////////////////

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
    mainContent = <Quizzes items={quizzes} onViewQuiz={showViewQuizHandler} />;
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
