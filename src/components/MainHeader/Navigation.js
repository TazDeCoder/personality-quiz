import styles from "./Navigation.module.css";
import Button from "../UI/Button";

function Navigation(props) {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Button onClick={props.onToggleForm}>Add New Quiz</Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
