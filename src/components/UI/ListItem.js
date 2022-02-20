import styles from "./ListItem.module.css";

function ListItem(props) {
  return (
    <li className={styles["list-item"]}>
      <p>{props.title}</p>
    </li>
  );
}

export default ListItem;
