import "./QuizzesList.css";
import QuizItem from "./QuizItem";

function QuizList(props) {
  return (
    <ul className="quizzes-list">
      {props.quizzes.map((quiz) => (
        <QuizItem key={quiz.id} title={quiz.title} author={quiz.author} />
      ))}
    </ul>
  );
}

export default QuizList;
