import { createContext } from "react";

const QuizContext = createContext({
  id: "",
  title: "",
  author: "",
  desc: "",
  questions: [
    {
      prompt: "",
      answers: [
        {
          text: "",
          types: [],
        },
      ],
    },
  ],
  types: [{ title: "", description: "" }],
  setQuiz: (quiz) => {},
  updateQuiz: (newQuiz) => {},
});

export default QuizContext;
