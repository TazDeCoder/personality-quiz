import React from "react";

import styles from "./SearchBar.module.css";

const SearchBar = React.forwardRef((props, ref) => {
  return (
    <div
      className={`${styles.searchbar} ${
        props?.className.searchbar ?? ""
      }`.trim()}
    >
      <div className={styles["searchbar-wrapper"]}>
        <input
          ref={ref}
          type="text"
          onChange={props.onType}
          onBlur={props.onBlur}
          onKeyDown={props.onKeyDown}
        />
        <button
          className={`${styles["searchbar-wrapper__btn--clear"]} ${
            props.className["searchbar-wrapper"] ?? ""
          }`.trim()}
          onClick={props.onClear}
        >
          &times;
        </button>
      </div>

      <ul
        className={`${styles["searchbar-list"]} ${
          props.className["searchbar-list"] ?? ""
        }`.trim()}
        onKeyDown={props.onKeyDown}
      >
        {props.searchTerms.map((searchTerm, idx) => (
          <li
            className={props.cursor === idx ? styles.selected : ""}
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
