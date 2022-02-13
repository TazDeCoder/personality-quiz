import { useState } from "react";

import styles from "./QuizForm.module.css";

function QuizForm(props) {
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");

  const titleChangeHandler = (e) => {
    setInputTitle(e.target.value);
  };

  const authorChangeHandler = (e) => {
    setInputAuthor(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Create quiz data object
    const quizData = {
      title: inputTitle,
      author: inputAuthor,
    };
    // Clear input fields
    setInputTitle("");
    setInputAuthor("");
    // Save quiz data
    props.onSaveQuizData(quizData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles["add-quiz__controls"]}>
        <div className={styles["add-quiz__control"]}>
          <label>Title</label>
          <input
            type="text"
            value={inputTitle}
            placeholder="Enter title of quiz"
            onChange={titleChangeHandler}
            required
          />
        </div>

        <div className={styles["add-quiz__control"]}>
          <label>Author</label>
          <input
            type="text"
            value={inputAuthor}
            placeholder="Enter your username"
            onChange={authorChangeHandler}
            required
          />
        </div>

        <div className={styles["add-quiz__actions"]}>
          <button>Add Quiz</button>
        </div>
      </div>
    </form>
  );
}

export default QuizForm;
