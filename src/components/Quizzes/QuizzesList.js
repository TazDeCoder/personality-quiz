import styles from "./QuizzesList.module.css";
import QuizItem from "./QuizItem";

function QuizList(props) {
  return (
    <ul className={styles["quizzes-list"]}>
      {props.quizzes.map((quiz) => (
        <QuizItem key={quiz.id} title={quiz.title} author={quiz.author} />
      ))}
    </ul>
  );
}

export default QuizList;
