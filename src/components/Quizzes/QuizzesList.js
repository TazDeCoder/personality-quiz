import styles from "./QuizzesList.module.css";
import QuizItem from "./QuizItem";

function QuizList(props) {
  const viewQuizHandler = (quizId) => {
    const quiz = props.quizzes.find((quiz) => quiz.id === quizId);

    props.onViewQuiz(quiz);
  };

  return (
    <ul className={styles["quizzes-list"]}>
      {props.quizzes.map((quiz) => (
        <QuizItem
          key={quiz.id}
          id={quiz.id}
          title={quiz.title}
          author={quiz.author}
          onViewQuiz={viewQuizHandler}
        />
      ))}
    </ul>
  );
}

export default QuizList;
