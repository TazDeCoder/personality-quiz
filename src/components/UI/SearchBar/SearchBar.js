import React from "react";

import styles from "./SearchBar.module.css";

const SearchBar = React.forwardRef((props, ref) => {
  return (
    <div className={`${styles.searchbar} ${props.className}`}>
      <div className={styles["searchbar-wrapper"]}>
        <input
          ref={ref}
          className={styles["searchbar-wrapper__input"]}
          type="text"
          onChange={props.onType}
        />
      </div>

      <ul className={styles["searchbar-list"]}>
        {props.suggestions.map((suggestion) => (
          <li
            className={styles["searchbar-list__item"]}
            key={suggestion.id}
            id={suggestion.id}
            onClick={props.onSuggestionClick}
          >
            {suggestion.title}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SearchBar;
