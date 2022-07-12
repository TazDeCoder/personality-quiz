import escape from "validator/lib/escape";

import styles from "./UpdateQuizForm.module.css";
// COMPONENTS
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import TextArea from "../../UI/TextArea/TextArea";
// CUSTOM HOOKS
import useInput from "../../../hooks/use-input";

import { validator } from "../../lib/index";

function UpdateQuizForm(props) {
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
  } = useInput(validator("quizTitle"), props.title);
  // TITLE CLASSES
  const titleInputClasses = enteredTitleHasErrors
    ? `${styles["update-quiz-form__control"]} ${styles.invalid}`
    : styles["update-quiz-form__control"];

  // DESC STATE + HANDLERS
  const {
    value: enteredDesc,
    isValid: enteredDescIsValid,
    hasErrors: enteredDescHasErrors,
    inputChangeHandler: descChangedHandler,
    inputBlurHandler: descBlurHandler,
  } = useInput(validator("quizDesc"), props.desc);
  // DESC STATE + HANDLERS
  const descInputClasses = enteredDescHasErrors ? styles.invalid : "";

  // Checking if all inputs provided are valid
  const inputsIsValid = enteredTitleIsValid && enteredDescIsValid;
  // Checking if any inputs have been changed
  const inputsChanged =
    enteredTitle !== props.title || enteredDesc !== props.desc;
  // Validate if form is valid
  if (inputsIsValid && inputsChanged) formIsValid = true;

  ////////////////////////////////////////////////
  ////// Event handlers
  ///////////////////////////////////////////////

  const submitHandler = (e) => {
    e.preventDefault();
    // Sanitize input fields
    const sanitizedEnteredTitle = escape(enteredTitle);
    const sanitizedEnteredDesc = escape(enteredDesc);
    // Create quiz data object
    const quizData = {
      title: sanitizedEnteredTitle,
      description: sanitizedEnteredDesc,
    };
    // Handle quiz data
    props.onUpdateQuizData(quizData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles["update-quiz-form__controls"]}>
        <Input
          id={"title"}
          className={titleInputClasses}
          label={"Title"}
          type={"text"}
          value={enteredTitle}
          onChange={titleChangedHandler}
          input={{
            placeholder: "Enter quiz title",
            maxLength: "200",
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

        <div className={styles["update-quiz-form__actions"]}>
          <Button type="submit" disabled={!formIsValid}>
            Update Details
          </Button>
        </div>
      </div>
    </form>
  );
}

export default UpdateQuizForm;
