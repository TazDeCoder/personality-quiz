import styles from "./Quizzes.module.css";
import Card from "../UI/Card/Card";
import QuizzesList from "./QuizzesList/QuizzesList";
import QuizzesSearchBar from "./QuizzesSearchBar";

function Quizzes(props) {
  return (
    <Card className={styles.quizzes}>
      <QuizzesSearchBar quizzes={props.items} onViewQuiz={props.onViewQuiz} />
      <QuizzesList quizzes={props.items} onViewQuiz={props.onViewQuiz} />
    </Card>
  );
}

export default Quizzes;
