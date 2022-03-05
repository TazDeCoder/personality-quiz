import styles from "./Navigation.module.css";
// COMPONENTS
import Button from "../UI/Button/Button";

function Navigation(props) {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          {!props.startQuiz && (
            <Button onClick={props.onToggleForm}>Add New Quiz</Button>
          )}
          {props.startQuiz && (
            <Button onClick={props.onClose}>Close Quiz</Button>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
