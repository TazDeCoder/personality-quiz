import { useContext } from "react";
import { isEmpty, isLength, equals, escape } from "validator/lib";

import styles from "./AddTypeForm.module.css";
// COMPONENTS
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import TextArea from "../../UI/TextArea/TextArea";
// CONTEXTS
import QuizContext from "../../../store/quiz-context";
// CUSTOM HOOKS
import useInput from "../../../hooks/use-input";

function AddTypeForm(props) {
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
  } = useInput((value) => !isEmpty(value) && isLength(value, { max: 64 }));
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
  } = useInput((value) => !isEmpty(value) && isLength(value, { max: 128 }));
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
      if (isEmpty(enteredTitle)) {
        props.onError({
          title: "Invalid title",
          message: "Must specify a valid title for the type",
        });
      }

      if (isEmpty(enteredDesc)) {
        props.onError({
          title: "Invalid description",
          message: "Must specify a valid description for the type",
        });
      }

      return;
    }
    // Checking if type already exists
    const existingTypeIdx = quizCtx.types.findIndex((type) =>
      equals(type.title, enteredTitle)
    );
    if (existingTypeIdx !== -1) {
      props.onError({
        title: "Type with same title exists",
        message: "Use a another title that has not been already used",
      });
      return;
    }
    // Sanitize input fields
    const sanitizedEnteredTitle = escape(enteredTitle);
    const sanitizedEnteredDesc = escape(enteredDesc);
    // Data provided is valid. Create type data object
    const typeData = {
      title: sanitizedEnteredTitle,
      description: sanitizedEnteredDesc,
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
            maxLength: "64",
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

export default AddTypeForm;
