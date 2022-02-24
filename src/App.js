import { useState, useEffect } from "react";

import MainHeader from "./components/MainHeader/MainHeader";
import Quizzes from "./components/Quizzes/Quizzes";
import AddQuiz from "./components/AddQuiz/AddQuiz";
import Modal from "./components/UI/Modal";
import ViewQuiz from "./components/ViewQuiz/ViewQuiz";
import EditQuiz from "./components/EditQuiz/EditQuiz";

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
          { text: "Yellow", types: ["yellow"] },
          { text: "Blue", types: ["blue"] },
          { text: "Red", types: ["red"] },
          { text: "Green", types: ["green"] },
        ],
      },
    ],
    types: [
      { title: "Yellow", description: "Banana" },
      { title: "Blue", description: "Blueberry" },
      { title: "Red", description: "Strawberry" },
      { title: "Green", description: "Apple" },
    ],
  },
  {
    id: Math.random().toString(),
    title: "Test Quiz 2",
    author: "Dev",
    desc: "Lorem ipsum dolor sit amet, eos natum prima commodo at, movet probatus euripidis mea ea, est nusquam propriae ut. Sed augue noster cu. An adhuc tibique deseruisse sed. Vidisse regione te cum, pro movet assueverit ne, affert dicant periculis id est. Elaboraret quaerendum scribentur cum ei, an vocibus nominavi constituto mea. Has ut dolor clita, ei illud electram nec. Sit illud dolore ei, vix quot elaboraret ei. Cu eam eius impedit molestie, cu petentium sapientem mel. Brute vituperatoribus per te.  Aperiri facilis ne vim, per scriptorem persequeris ad. No qui nullam eruditi, et insolens instructior contentiones eum. His ne indoctum molestiae appellantur, ad placerat disputando instructior mel, in his vero mundi vocent. Sit veri paulo prompta in. Vidit vidisse mea ut, pri velit oporteat cu, in has diceret.",
    questions: [
      {
        id: Math.random().toString(),
        prompt: "What is your favourite color",
        answers: [
          { text: "Yellow", types: ["yellow"] },
          { text: "Blue", types: ["blue"] },
          { text: "Red", types: ["red"] },
          { text: "Green", types: ["green"] },
        ],
      },
    ],
    types: [
      { title: "Yellow", description: "Banana" },
      { title: "Blue", description: "Blueberry" },
      { title: "Red", description: "Strawberry" },
      { title: "Green", description: "Apple" },
    ],
  },
];

function App() {
  // Retrive any saved quizzes in local storage
  const quizzesStorage = localStorage.getItem("quizzes");

  const [quizzes, setQuizzes] = useState(
    quizzesStorage ? JSON.parse(quizzesStorage) : SAMPLE_QUIZZES
  );
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState();
  const [viewQuiz, setViewQuiz] = useState();
  const [editQuiz, setEditQuiz] = useState();

  useEffect(() => {
    const existingQuizIdx = quizzes.findIndex(
      (quiz) => quiz?.id === currentQuiz?.id
    );
    if (existingQuizIdx === -1) return;
    setCurrentQuiz(quizzes[existingQuizIdx]);
    // Update quizzes in local storage
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    if (viewQuiz) setCurrentQuiz(viewQuiz);
    else setCurrentQuiz(null);
  }, [viewQuiz]);

  const toggleQuizFormHandler = () => {
    setShowQuizForm((prevShowQuizForm) => !prevShowQuizForm);
  };

  const showViewQuizHandler = (quizId) => {
    setViewQuiz(quizId);
  };

  const closeViewQuizHandler = () => {
    setViewQuiz(null);
  };

  const showEditQuizHandler = () => {
    setEditQuiz(currentQuiz);
  };

  const closeEditQuizHandler = () => {
    setEditQuiz(null);
  };

  const addQuizHandler = (newQuiz) => {
    setQuizzes((prevExpenses) => {
      return [...prevExpenses, newQuiz];
    });
    // Close quiz form
    setShowQuizForm(false);
  };

  const updateQuizHandler = (id, quizData) => {
    const existingQuizIdx = quizzes.findIndex((quiz) => quiz.id === id);
    if (existingQuizIdx === -1) return;
    // Update quizzes
    setQuizzes((prevQuizzes) => {
      const updatedQuizzes = [...prevQuizzes];
      updatedQuizzes[existingQuizIdx] = { ...quizData };
      return updatedQuizzes;
    });
  };

  return (
    <>
      {showQuizForm && (
        <Modal onClose={toggleQuizFormHandler}>
          <AddQuiz onAddQuiz={addQuizHandler} />
        </Modal>
      )}
      {viewQuiz && !editQuiz && (
        <Modal onClose={closeViewQuizHandler}>
          <ViewQuiz
            quiz={currentQuiz ? currentQuiz : viewQuiz}
            onEditQuiz={showEditQuizHandler}
          />
        </Modal>
      )}
      {editQuiz && (
        <Modal>
          <EditQuiz
            quiz={currentQuiz ? currentQuiz : editQuiz}
            onUpdateQuiz={updateQuizHandler}
            onClose={closeEditQuizHandler}
          />
        </Modal>
      )}
      <MainHeader onToggleQuizForm={toggleQuizFormHandler} />
      <main>
        <Quizzes items={quizzes} onViewQuiz={showViewQuizHandler} />
      </main>
    </>
  );
}

export default App;
