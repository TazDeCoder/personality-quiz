import { useState, useRef, useContext } from "react";

import styles from "./QuizzesSearchBar.module.css";
import SearchBar from "../UI/SearchBar/SearchBar";
import QuizContext from "../../store/quiz-context";

function QuizzesSearchBar(props) {
  const quizCtx = useContext(QuizContext);

  const RESULTS_LIMIT = 5;
  const [suggestions, setSuggestions] = useState([]);
  const searchBarRef = useRef("");

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
    quizCtx.setQuiz(quiz);
    props.onViewQuiz();
    // Clear searchbar
    searchBarRef.current.value = "";
    setSuggestions([]);
  };

  return (
    <>
      <SearchBar
        ref={searchBarRef}
        className={styles.searchbar}
        suggestions={suggestions}
        onType={typeHandler}
        onSuggestionClick={suggestionClickHandler}
      />
    </>
  );
}

export default QuizzesSearchBar;
