import { createContext } from "react";

const QuizContext = createContext({
  id: "",
  title: "",
  author: "",
  desc: "",
  questions: [
    {
      id: "",
      prompt: "",
      answers: [
        {
          id: "",
          text: "",
          types: [],
        },
      ],
    },
  ],
  types: [{ title: "", desc: "" }],
  setQuiz: (currQuiz) => {},
  updateQuiz: (newQuiz) => {},
});

export default QuizContext;
