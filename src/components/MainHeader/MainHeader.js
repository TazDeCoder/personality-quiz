import styles from "./MainHeader.module.css";
import Navigation from "./Navigation";

const MainHeader = (props) => {
  return (
    <header className={styles["main-header"]}>
      <h1>Personality Quiz</h1>
      <Navigation onToggleForm={props.onToggleQuizForm} />
    </header>
  );
};

export default MainHeader;
