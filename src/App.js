import { useState } from "react";

import Quizzes from "./components/Quizzes/Quizzes";
import AddQuiz from "./components/AddQuiz/AddQuiz";

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

  const addQuizHandler = (quiz) => {
    setQuizzes((prevExpenses) => {
      return [...prevExpenses, quiz];
    });
  };

  return (
    <>
      <AddQuiz onAddQuiz={addQuizHandler} />
      <Quizzes items={quizzes} />
    </>
  );
}

export default App;
