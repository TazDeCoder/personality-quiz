import { useState } from "react";

import Quizzes from "./components/Quizzes";

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
  const [quizzes] = useState(SAMPLE_QUIZZES);

  return (
    <div>
      <Quizzes items={quizzes} />
    </div>
  );
}

export default App;
