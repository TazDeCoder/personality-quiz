import styles from "./ListItem.module.css";

function ListItem(props) {
  return (
    <div className={styles["list-item"]} onClick={props.onClick}>
      <p>{props.title}</p>
    </div>
  );
}

export default ListItem;
