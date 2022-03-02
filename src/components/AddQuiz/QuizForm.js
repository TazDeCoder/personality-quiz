import styles from "./QuizForm.module.css";
import Button from "../UI/Button/Button";
import useInput from "../../hooks/use-input";

function QuizForm(props) {
  let formIsValid = false;

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasErrors: enteredTitleHasErrors,
    inputChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
  } = useInput((value) => value.trim().length !== 0);

  const titleInputClasses = enteredTitleHasErrors
    ? `${styles["quiz-form__control"]} ${styles.invalid}`
    : styles["quiz-form__control"];

  const {
    value: enteredAuthor,
    isValid: enteredAuthorIsValid,
    hasErrors: enteredAuthorHasErrors,
    inputChangeHandler: authorChangedHandler,
    inputBlurHandler: authorBlurHandler,
  } = useInput((value) => value.trim().length !== 0);

  const authorInputClasses = enteredAuthorHasErrors
    ? `${styles["quiz-form__control"]} ${styles.invalid}`
    : styles["quiz-form__control"];

  const {
    value: enteredDesc,
    isValid: enteredDescIsValid,
    hasErrors: enteredDescHasErrors,
    inputChangeHandler: descChangedHandler,
    inputBlurHandler: descBlurHandler,
  } = useInput((value) => value.trim().length !== 0);

  const descInputClasses = enteredDescHasErrors
    ? `${styles["quiz-form__control"]} ${styles.invalid}`
    : styles["quiz-form__control"];

  if (enteredTitleIsValid && enteredAuthorIsValid && enteredDescIsValid)
    formIsValid = true;

  const submitHandler = (e) => {
    e.preventDefault();
    // Create quiz data object
    const quizData = {
      title: enteredTitle,
      author: enteredAuthor,
      desc: enteredDesc,
    };
    // Save quiz data
    props.onSaveQuizData(quizData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles["quiz-form__controls"]}>
        <div className={titleInputClasses}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={enteredTitle}
            placeholder="Enter quiz title"
            maxLength="128"
            required
            onChange={titleChangedHandler}
            onBlur={titleBlurHandler}
          />
        </div>

        <div className={authorInputClasses}>
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            value={enteredAuthor}
            placeholder="Enter your username"
            required
            onChange={authorChangedHandler}
            onBlur={authorBlurHandler}
          />
        </div>

        <div className={descInputClasses}>
          <label htmlFor="desc">Desc</label>
          <textarea
            id="desc"
            value={enteredDesc}
            placeholder="Write brief description of quiz"
            maxLength="400"
            required
            onChange={descChangedHandler}
            onBlur={descBlurHandler}
          />
        </div>

        <div className={styles["quiz-form__actions"]}>
          <Button type="submit" disabled={!formIsValid}>
            Create Draft
          </Button>
        </div>
      </div>
    </form>
  );
}

export default QuizForm;
