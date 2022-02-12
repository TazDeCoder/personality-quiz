import "./Quizzes.css";
import QuizzesList from "./QuizzesList";
import QuizzesSearchBar from "./QuizzesSearchBar";

function Quizzes(props) {
  return (
    <div className="quizzes">
      <QuizzesSearchBar quizzes={props.items} />
      <QuizzesList quizzes={props.items} />
    </div>
  );
}

export default Quizzes;
