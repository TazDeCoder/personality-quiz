import { useState, useRef, useContext } from "react";

import styles from "./QuizzesSearchBar.module.css";
// COMPONENTS
import SearchBar from "../UI/SearchBar/SearchBar";
// CONTEXTS
import QuizContext from "../../store/quiz-context";

function QuizzesSearchBar(props) {
  const RESULTS_LIMIT = 5;

  ////////////////////////////////////////////////
  ////// Declaring states, ref and context
  ///////////////////////////////////////////////

  const quizCtx = useContext(QuizContext);

  const searchBarRef = useRef();
  const [searchTerms, setSearchTerms] = useState([]);
  const [cursor, setCursor] = useState(0);

  ////////////////////////////////////////////////
  ////// Helper functions
  ///////////////////////////////////////////////

  const resetSearchBar = () => {
    searchBarRef.current.value = "";
    setSearchTerms([]);
  };

  ////////////////////////////////////////////////
  ////// Event handlers
  ///////////////////////////////////////////////

  const searchBarTypeHandler = (e) => {
    const searchInput = e.target.value;
    if (!searchInput) {
      setSearchTerms([]);
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
    setSearchTerms(filteredQuizzes);
  };

  const searchbarClearHandler = () => {
    resetSearchBar();
  };

  const searchBarBlurHandler = () => {
    setTimeout(() => {
      setCursor(0);
      setSearchTerms([]);
    }, 1000);
  };

  const searchBarKeydownChangeHandler = (e) => {
    // Enter
    if (e.keyCode === 13) {
      const searchTerm = searchTerms[cursor];
      const quiz = props.quizzes.find((quiz) => quiz.id === searchTerm.id);
      quizCtx.setQuiz(quiz);
      props.onViewQuiz();
      // Clear searchbar field
      resetSearchBar();
    }
    // Arrow-up
    if (e.keyCode === 38 && cursor > 0) {
      setCursor((prevCursor) => --prevCursor);
    }
    // Arrow-down
    if (e.keyCode === 40 && cursor < searchTerms.length - 1) {
      setCursor((prevCursor) => ++prevCursor);
    }
  };

  const searchTermClickHandler = (e) => {
    const quiz = props.quizzes.find(
      (quiz) => quiz.id === e.target.getAttribute("id")
    );
    quizCtx.setQuiz(quiz);
    props.onViewQuiz();
    // Clear searchbar field
    resetSearchBar();
  };

  const searchTermMouseEnterHandler = (e) => {
    const target = e.target;
    if (!target);
    setCursor(target.index);
  };

  return (
    <SearchBar
      ref={searchBarRef}
      className={styles.searchbar}
      searchTerms={searchTerms}
      cursor={cursor}
      onType={searchBarTypeHandler}
      onClear={searchbarClearHandler}
      onBlur={searchBarBlurHandler}
      onKeyDown={searchBarKeydownChangeHandler}
      onClick={searchTermClickHandler}
      onMouseEnter={searchTermMouseEnterHandler}
    />
  );
}

export default QuizzesSearchBar;
