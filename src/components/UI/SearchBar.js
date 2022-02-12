import styles from "./SearchBar.module.css";

function SearchBar(props) {
  return (
    <div className={styles.searchbar}>
      <form className={styles["searchbar-form"]}>
        <input
          className={styles["searchbar-form__input"]}
          type={styles.text}
          onChange={props.onType}
        />
      </form>

      <ul className={styles["searchbar-list"]}>
        {props.suggestions.map((suggestion, idx) => (
          <li className={styles["searchbar-list__item"]} key={idx}>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
