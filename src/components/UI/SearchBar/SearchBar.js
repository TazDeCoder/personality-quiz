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
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
        />
        <button
          className={styles["searchbar-wrapper__btn--clear"]}
          onClick={props.onClear}
        >
          &times;
        </button>
      </div>

      <ul className={styles["searchbar-list"]} onKeyDown={props.onKeyDown}>
        {props.searchTerms.map((searchTerm, idx) => (
          <li
            className={`${styles["searchbar-list__item"]} ${
              props.cursor === idx ? styles.selected : ""
            }`}
            key={searchTerm.id}
            id={searchTerm.id}
            index={idx}
            onClick={props.onClick}
            onMouseEnter={props.onMouseEnter}
          >
            {searchTerm.title}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SearchBar;
