import styles from "./Quizzes.module.css";
import QuizzesList from "./QuizzesList";
import QuizzesSearchBar from "./QuizzesSearchBar";
import Card from "../UI/Card";

function Quizzes(props) {
  return (
    <Card className={styles.quizzes}>
      <QuizzesSearchBar quizzes={props.items} onViewQuiz={props.onViewQuiz} />
      <QuizzesList quizzes={props.items} onViewQuiz={props.onViewQuiz} />
    </Card>
  );
}

export default Quizzes;
