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
      .map((quiz) => {
        return {
          id: quiz.id,
          title: quiz.title,
        };
      })
      .filter((quiz) =>
        quiz.title.toLowerCase().startsWith(searchInput.toLowerCase())
      )
      .slice(0, RESULTS_LIMIT);
    setSuggestions(filteredQuizzes);
  };

  const suggestionClickHandler = (e) => {
    const quiz = props.quizzes.find(
      (quiz) => quiz.id === e.target.getAttribute("id")
    );
    props.onViewQuiz(quiz);
    setSuggestions([]);
  };

  return (
    <>
      <SearchBar
        className={styles.searchbar}
        suggestions={suggestions}
        onType={typeHandler}
        onSuggestionClick={suggestionClickHandler}
      />
    </>
  );
}

export default QuizzesSearchBar;
