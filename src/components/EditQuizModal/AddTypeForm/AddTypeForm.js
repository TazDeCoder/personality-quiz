import { useContext } from "react";

import styles from "./AddTypeForm.module.css";
// COMPONENTS
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import TextArea from "../../UI/TextArea/TextArea";
// CONTEXTS
import QuizContext from "../../../store/quiz-context";
// CUSTOM HOOKS
import useInput from "../../../hooks/use-input";

function AddType(props) {
  let formIsValid = false;

  ////////////////////////////////////////////////
  ////// Declaring states
  ////// (+ conditonal classes and variables)
  ///////////////////////////////////////////////

  const quizCtx = useContext(QuizContext);

  // TITLE STATE + HANDLERS
  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasErrors: enteredTitleHasErrors,
    inputChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    inputResetHandler: resetEnteredTitle,
  } = useInput((value) => value.trim().length !== 0);
  // TITLE CLASSES
  const titleInputClasses = enteredTitleHasErrors
    ? `${styles["type-form__control"]} ${styles.invalid}`
    : styles["type-form__control"];

  // DESC STATE + HANDLERS
  const {
    value: enteredDesc,
    isValid: enteredDescIsValid,
    hasErrors: enteredDescHasErrors,
    inputChangeHandler: descChangedHandler,
    inputBlurHandler: descBlurHandler,
    inputResetHandler: resetEnteredDesc,
  } = useInput((value) => value.trim().length !== 0);
  // DESC CLASSES
  const descInputClasses = enteredDescHasErrors ? styles.invalid : "";

  // Checking if all inputs provided are valid
  if (enteredTitleIsValid && enteredDescIsValid) formIsValid = true;

  ////////////////////////////////////////////////
  ////// Event handlers
  ///////////////////////////////////////////////

  const submitHandler = (e) => {
    e.preventDefault();
    // Checking field validity
    if (enteredTitleHasErrors || enteredDescHasErrors) {
      if (enteredTitle.trim().length === 0) {
        props.onError({
          title: "Invalid title",
          message: "Must specify a valid title for the type",
        });
      }

      if (enteredDesc.trim().length === 0) {
        props.onError({
          title: "Invalid description",
          message: "Must specify a valid description for the type",
        });
      }

      return;
    }
    // Checking if type already exists
    const existingTypeIdx = quizCtx.types.findIndex(
      (type) => type.title.toLowerCase() === enteredTitle.toLowerCase()
    );
    if (existingTypeIdx !== -1) {
      props.onError({
        title: "Type with same title exists",
        message: "Use a another title that has not been already used",
      });
      return;
    }
    // Data provided is valid. Create type data object
    const typeData = {
      title: enteredTitle,
      description: enteredDesc,
    };
    // Handle type data
    props.onAddType(typeData);
    // Clear input fields
    resetEnteredTitle();
    resetEnteredDesc();
    // Close modal window
    props.onClose();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles["type-form__controls"]}>
        <Input
          id={"title"}
          className={titleInputClasses}
          label={"Title"}
          type={"text"}
          value={enteredTitle}
          onChange={titleChangedHandler}
          input={{
            placeholder: "Enter type title",
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
            placeholder: "Write description of type",
            maxLength: "128",
            required: true,
            onBlur: descBlurHandler,
          }}
        />

        <div className={styles["type-form__actions"]}>
          <Button type="submit" disabled={!formIsValid}>
            Add Type
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddType;
