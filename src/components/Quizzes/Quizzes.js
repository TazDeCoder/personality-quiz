import styles from "./Quizzes.module.css";
import QuizzesList from "./QuizzesList";
import QuizzesSearchBar from "./QuizzesSearchBar";
import Card from "../UI/Card";

function Quizzes(props) {
  return (
    <Card className={styles.quizzes}>
      <QuizzesSearchBar quizzes={props.items} />
      <QuizzesList quizzes={props.items} />
    </Card>
  );
}

export default Quizzes;
