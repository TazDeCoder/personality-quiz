import { useState } from "react";

import QuizForm from "./QuizForm";

function EditQuiz(props) {
  const [quizQuestions, setQuizQuestions] = useState(props.quiz.questions);
  const [quizTypes, setQuizTypes] = useState(props.quiz.types);

  const updateQuizDataHandler = (inputQuizData) => {
    // Create new quiz data object
    const quizData = {
      ...props.quiz,
      questions: [...quizQuestions, ...(inputQuizData?.questions ?? [])],
      types: [...quizTypes, ...(inputQuizData?.types ?? [])],
    };
    // Update neccessary states
    if (inputQuizData?.questions) setQuizQuestions(quizData.questions);
    if (inputQuizData?.types) setQuizTypes(quizData.types);
    // Handle updating current quiz
    props.onUpdateQuiz(props.quiz.id, quizData);
  };

  return (
    <>
      <QuizForm
        quiz={props.quiz}
        onUpdateQuizData={updateQuizDataHandler}
        onClose={props.onClose}
      />
    </>
  );
}

export default EditQuiz;
