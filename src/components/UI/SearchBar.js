import styles from "./SearchBar.module.css";

function SearchBar(props) {
  return (
    <div className={`${styles.searchbar} ${props.className}`}>
      <div className={styles["searchbar-wrapper"]}>
        <input
          className={styles["searchbar-wrapper__input"]}
          type="text"
          onChange={props.onType}
        />
      </div>

      <ul className={styles["searchbar-list"]}>
        {props.suggestions.map((suggestion, idx) => (
          <li key={idx} className={styles["searchbar-list__item"]}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
