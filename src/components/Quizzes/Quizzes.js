import styles from "./Quizzes.module.css";
// COMPONENTS
import QuizzesList from "./QuizzesList/QuizzesList";
import QuizzesSearchBar from "./QuizzesSearchBar/QuizzesSearchBar";
// --- UI ---
import Card from "../UI/Card/Card";

function Quizzes(props) {
  return (
    <Card className={styles.quizzes}>
      <QuizzesSearchBar
        quizzes={props.items}
        onViewQuiz={props.onViewQuiz}
        onError={props.onError}
      />
      <QuizzesList
        quizzes={props.items}
        onViewQuiz={props.onViewQuiz}
        onError={props.onError}
      />
    </Card>
  );
}

export default Quizzes;
