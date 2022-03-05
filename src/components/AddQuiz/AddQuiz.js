import QuizForm from "./QuizForm";

function AddQuiz(props) {
  const saveQuizDataHandler = (inputQuizData) => {
    const quizData = {
      ...inputQuizData,
      id: Math.random().toString(),
      questions: [],
      types: [],
    };
    props.onAddQuiz(quizData);
    // Close modal window
    props.onClose();
  };

  return (
    <>
      <h1>Create New Quiz</h1>
      <QuizForm onSaveQuizData={saveQuizDataHandler} />
    </>
  );
}

export default AddQuiz;
