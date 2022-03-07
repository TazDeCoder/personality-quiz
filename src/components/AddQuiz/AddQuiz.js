import { useContext } from "react";

// COMPONENTS
import QuizForm from "./QuizForm";
// CONTEXTS
import UserContext from "../../store/user-context";

function AddQuiz(props) {
  const userCtx = useContext(UserContext);

  const saveQuizDataHandler = (inputQuizData) => {
    const quizData = {
      ...inputQuizData,
      questions: [],
      types: [],
      created_by: userCtx.id,
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
