import { useState } from "react";

import MainHeader from "./components/MainHeader/MainHeader";
import Quizzes from "./components/Quizzes/Quizzes";
import AddQuiz from "./components/AddQuiz/AddQuiz";
import Modal from "./components/UI/Modal";

const SAMPLE_QUIZZES = [
  {
    id: Math.random().toString(),
    title: "Test Quiz 1",
    author: "Dev",
  },
  {
    id: Math.random().toString(),
    title: "Test Quiz 2",
    author: "Dev",
  },
];

function App() {
  const [quizzes, setQuizzes] = useState(SAMPLE_QUIZZES);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [viewQuiz, setViewQuiz] = useState();

  const addQuizHandler = (quiz) => {
    setQuizzes((prevExpenses) => {
      return [...prevExpenses, quiz];
    });

    setShowQuizForm(false);
  };

  const toggleQuizFormHandler = () => {
    setShowQuizForm(!showQuizForm);
  };

  const viewQuizHandler = (quiz) => {
    setViewQuiz(quiz);
  };

  const closeViewQuizHandler = () => {
    setViewQuiz(null);
  };

  return (
    <>
      {showQuizForm && (
        <Modal onClose={toggleQuizFormHandler}>
          <AddQuiz onAddQuiz={addQuizHandler} />
        </Modal>
      )}
      {viewQuiz && (
        <Modal onClose={closeViewQuizHandler}>
          <div>
            <h1>{viewQuiz.title}</h1>
            <p>{viewQuiz.author}</p>
          </div>
        </Modal>
      )}
      <MainHeader onToggleQuizForm={toggleQuizFormHandler} />
      <main>
        <Quizzes items={quizzes} onViewQuiz={viewQuizHandler} />
      </main>
    </>
  );
}

export default App;
