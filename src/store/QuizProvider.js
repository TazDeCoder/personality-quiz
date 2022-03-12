import { useReducer } from "react";

import QuizContext from "./quiz-context";

const defaultQuizState = {
  id: "",
  title: "",
  author: "",
  desc: "",
  questions: [],
  types: [],
};

function quizReducer(state, action) {
  if (action.type === "SET_QUIZ") {
    return { ...action.quiz };
  }

  if (action.type === "UPDATE_QUIZ") {
    return { ...state, ...action.quiz };
  }

  return defaultQuizState;
}

function QuizProvider(props) {
  const [quizState, dispatchQuizState] = useReducer(
    quizReducer,
    defaultQuizState
  );

  const setQuizHandler = (quiz) => {
    dispatchQuizState({ type: "SET_QUIZ", quiz: quiz });
  };

  const updateQuizHandler = (newQuiz) => {
    dispatchQuizState({ type: "UPDATE_QUIZ", quiz: newQuiz });
  };

  const quizContext = {
    id: quizState.id,
    title: quizState.title,
    author: quizState.author,
    desc: quizState.desc,
    questions: quizState.questions,
    types: quizState.types,
    setQuiz: setQuizHandler,
    updateQuiz: updateQuizHandler,
  };

  return (
    <QuizContext.Provider value={quizContext}>
      {props.children}
    </QuizContext.Provider>
  );
}

export default QuizProvider;
