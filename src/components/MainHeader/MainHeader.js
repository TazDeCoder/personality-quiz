import styles from "./MainHeader.module.css";
import Navigation from "./Navigation";

const MainHeader = (props) => {
  return (
    <header className={styles["main-header"]}>
      <h1>Personality Quiz</h1>
      <Navigation
        startQuiz={props.startQuiz}
        onToggleForm={props.onToggleQuizForm}
        onClose={props.onClose}
      />
    </header>
  );
};

export default MainHeader;
