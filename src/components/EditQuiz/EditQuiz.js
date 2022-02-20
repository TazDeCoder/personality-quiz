import QuizForm from "./QuizForm";

function EditQuiz(props) {
  const updateQuizDataHandler = (inputQuizData) => {
    const quizData = {
      ...props.quiz,
      questions: [...props.quiz.questions, ...(inputQuizData?.questions ?? "")],
      types: [...props.quiz.types, ...(inputQuizData?.types ?? "")],
    };
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
