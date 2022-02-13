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
    <div>
      <QuizForm onSaveQuizData={saveQuizDataHandler} />
    </div>
  );
}

export default AddQuiz;
