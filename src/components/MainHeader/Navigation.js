import styles from "./Navigation.module.css";
import Button from "../UI/Button";

function Navigation(props) {
  return (
    <nav class={styles.nav}>
      <ul>
        <li>
          <Button onClick={props.onLogout}>Add New Quiz</Button>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
