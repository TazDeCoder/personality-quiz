import "./Quizzes.css";
import QuizzesList from "./QuizzesList";

function Quizzes(props) {
  return (
    <div className="quizzes">
      <QuizzesList quizzes={props.items} />
    </div>
  );
}

export default Quizzes;
