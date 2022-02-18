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

  const addQuizHandler = (quiz) => {
    setQuizzes((prevExpenses) => {
      return [...prevExpenses, quiz];
    });

    setShowQuizForm(false);
  };

  const toggleQuizFormHandler = () => {
    setShowQuizForm(!showQuizForm);
  };

  return (
    <>
      <MainHeader onToggleQuizForm={toggleQuizFormHandler} />
      <main>
        {showQuizForm && (
          <Modal onClose={toggleQuizFormHandler}>
            <AddQuiz onAddQuiz={addQuizHandler} />{" "}
          </Modal>
        )}
        <Quizzes items={quizzes} />
      </main>
    </>
  );
}

export default App;
