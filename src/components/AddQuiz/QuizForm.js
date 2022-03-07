import styles from "./QuizForm.module.css";
// COMPONENTS
import Button from "../UI/Button/Button";
// CUSTOM HOOKS
import useInput from "../../hooks/use-input";

function QuizForm(props) {
  let formIsValid = false;

  ////////////////////////////////////////////////
  ////// Declaring states
  ////// (+ conditonal classes and variables)
  ///////////////////////////////////////////////

  // TITLE STATE + HANDLERS
  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasErrors: enteredTitleHasErrors,
    inputChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
  } = useInput((value) => value.trim().length !== 0);
  // TITLE CLASSES
  const titleInputClasses = enteredTitleHasErrors
    ? `${styles["quiz-form__control"]} ${styles.invalid}`
    : styles["quiz-form__control"];

  // DESC STATE + HANDLERS
  const {
    value: enteredDesc,
    isValid: enteredDescIsValid,
    hasErrors: enteredDescHasErrors,
    inputChangeHandler: descChangedHandler,
    inputBlurHandler: descBlurHandler,
  } = useInput((value) => value.trim().length !== 0);
  // DESC STATE + HANDLERS
  const descInputClasses = enteredDescHasErrors
    ? `${styles["quiz-form__control"]} ${styles.invalid}`
    : styles["quiz-form__control"];

  // Checking if all inputs provided are valid
  if (enteredTitleIsValid && enteredDescIsValid) formIsValid = true;

  ////////////////////////////////////////////////
  ////// Event handlers
  ///////////////////////////////////////////////

  const submitHandler = (e) => {
    e.preventDefault();
    // Create quiz data object
    const quizData = {
      title: enteredTitle,
      description: enteredDesc,
    };
    // Handle quiz data
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
