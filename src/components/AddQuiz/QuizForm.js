import styles from "./QuizForm.module.css";
// COMPONENTS
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import TextArea from "../UI/TextArea/TextArea";
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
  const titleInputClasses = enteredTitleHasErrors ? styles.invalid : "";

  // DESC STATE + HANDLERS
  const {
    value: enteredDesc,
    isValid: enteredDescIsValid,
    hasErrors: enteredDescHasErrors,
    inputChangeHandler: descChangedHandler,
    inputBlurHandler: descBlurHandler,
  } = useInput((value) => value.trim().length !== 0);
  // DESC STATE + HANDLERS
  const descInputClasses = enteredDescHasErrors ? styles.invalid : "";

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
        <Input
          className={titleInputClasses}
          id={"title"}
          label={"Title"}
          type={"text"}
          value={enteredTitle}
          onChange={titleChangedHandler}
          input={{
            placeholder: "Enter quiz title",
            maxLength: "128",
            required: true,
            onBlur: titleBlurHandler,
          }}
        />

        <TextArea
          className={descInputClasses}
          id={"desc"}
          label={"Desc"}
          value={enteredDesc}
          onChange={descChangedHandler}
          textarea={{
            placeholder: "Write brief description of quiz",
            maxLength: "400",
            required: true,
            onBlur: descBlurHandler,
          }}
        />

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
