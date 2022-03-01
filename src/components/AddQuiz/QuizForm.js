import { useState } from "react";

import styles from "./QuizForm.module.css";
import Button from "../UI/Button/Button";

function QuizForm(props) {
  const [inputTitle, setInputTitle] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputDesc, setInputDesc] = useState("");

  const titleChangeHandler = (e) => {
    setInputTitle(e.target.value);
  };

  const authorChangeHandler = (e) => {
    setInputAuthor(e.target.value);
  };

  const descChangeHandler = (e) => {
    setInputDesc(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Create quiz data object
    const quizData = {
      title: inputTitle,
      author: inputAuthor,
      desc: inputDesc,
    };
    // Clear input fields
    setInputTitle("");
    setInputAuthor("");
    setInputDesc("");
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
            maxLength="128"
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

        <div className={styles["add-quiz__control"]}>
          <label>Desc</label>
          <textarea
            value={inputDesc}
            placeholder="Fill in details of the quiz"
            onChange={descChangeHandler}
            maxLength="960"
            required
          />
        </div>

        <div className={styles["add-quiz__actions"]}>
          <Button type="submit">Create Quiz Draft</Button>
        </div>
      </div>
    </form>
  );
}

export default QuizForm;
