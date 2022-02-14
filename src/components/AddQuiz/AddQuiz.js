import QuizForm from "./QuizForm";

function AddQuiz(props) {
  const saveQuizDataHandler = (inputQuizData) => {
    const quizData = {
      ...inputQuizData,
      id: Math.random().toString(),
    };
    props.onAddQuiz(quizData);
  };

  return (
    <>
      <QuizForm onSaveQuizData={saveQuizDataHandler} />
    </>
  );
}

export default AddQuiz;
