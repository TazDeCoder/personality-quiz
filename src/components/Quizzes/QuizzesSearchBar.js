import { useState } from "react";

import styles from "./QuizzesSearchBar.module.css";
import SearchBar from "../UI/SearchBar";

function QuizzesSearchBar(props) {
  const RESULTS_LIMIT = 5;
  const [suggestions, setSuggestions] = useState([]);

  const typeHandler = (e) => {
    const searchInput = e.target.value;
    if (!searchInput) {
      setSuggestions([]);
      return;
    }
    const filteredQuizzes = props.quizzes
      .map((quiz) => quiz.title)
      .filter((title) =>
        title.toLowerCase().startsWith(searchInput.toLowerCase())
      )
      .slice(0, RESULTS_LIMIT);
    setSuggestions(filteredQuizzes);
  };

  return (
    <>
      <SearchBar
        className={styles.searchbar}
        suggestions={suggestions}
        onType={typeHandler}
      />
    </>
  );
}

export default QuizzesSearchBar;
