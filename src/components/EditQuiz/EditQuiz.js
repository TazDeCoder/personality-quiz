import { useState, useContext } from "react";

import QuizForm from "./QuizForm";
import QuizContext from "../../store/quiz-context";

function EditQuiz(props) {
  const quizCtx = useContext(QuizContext);

  const [quizQuestions, setQuizQuestions] = useState(quizCtx.questions);
  const [quizTypes, setQuizTypes] = useState(quizCtx.types);

  const updateQuizDataHandler = (inputQuizData) => {
    // Create new quiz data object
    const quizData = {
      ...quizCtx,
      questions: [...quizQuestions, ...(inputQuizData?.questions ?? [])],
      types: [...quizTypes, ...(inputQuizData?.types ?? [])],
    };
    // Update neccessary states
    if (inputQuizData?.questions) setQuizQuestions(quizData.questions);
    if (inputQuizData?.types) setQuizTypes(quizData.types);
    // Handle updating current quiz
    quizCtx.updateQuiz(quizData);
    props.onUpdateQuiz(quizCtx.id, quizData);
  };

  return (
    <>
      <QuizForm
        quiz={quizCtx}
        onUpdateQuizData={updateQuizDataHandler}
        onClose={props.onClose}
      />
    </>
  );
}

export default EditQuiz;
