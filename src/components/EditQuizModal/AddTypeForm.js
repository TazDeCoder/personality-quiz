import { useState, useContext } from "react";

import styles from "./AddTypeForm.module.css";
import Button from "../UI/Button/Button";
import QuizContext from "../../store/quiz-context";
import useInput from "../../hooks/use-input";

function AddType(props) {
  const quizCtx = useContext(QuizContext);

  const {
    value: enteredTitle,
    hasErrors: enteredTitleHasErrors,
    inputChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    inputResetHandler: resetEnteredTitle,
  } = useInput((value) => value.trim().length !== 0);

  const titleNameClasses = enteredTitleHasErrors
    ? `${styles["type-form__control"]} ${styles.invalid}`
    : styles["type-form__control"];

  const {
    value: enteredDesc,
    hasErrors: enteredDescHasErrors,
    inputChangeHandler: descChangedHandler,
    inputBlurHandler: descBlurHandler,
    inputResetHandler: resetEnteredDesc,
  } = useInput((value) => value.trim().length !== 0);

  const descNameClasses = enteredDescHasErrors
    ? `${styles["type-form__control"]} ${styles.invalid}`
    : styles["type-form__control"];

  const submitHandler = (e) => {
    e.preventDefault();
    // Checking field validity
    if (enteredTitle.trim().length === 0) {
      props.onError({
        title: "Invalid title",
        message: "Must specify a valid title for the type",
      });
      return;
    }
    if (enteredDesc.trim().length === 0) {
      props.onError({
        title: "Invalid description",
        message: "Must specify a valid description for the type",
      });
      return;
    }
    // Checking if type already exists
    const typeFoundIdx = quizCtx.types.findIndex(
      (type) => type.title.toLowerCase() === enteredTitle.toLowerCase()
    );
    if (typeFoundIdx !== -1) {
      props.onError({
        title: "Type with same title exists",
        message: "Use a another title that has not been already used",
      });
      return;
    }
    // Data provided is valid. Create type object
    const typeData = {
      title: enteredTitle,
      description: enteredDesc,
    };
    // Clear input fields
    resetEnteredTitle();
    resetEnteredDesc();
    // Close modal window
    props.onClose();
    // Handle type data
    props.onAddNewType(typeData);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles["type-form__controls"]}>
        <div className={titleNameClasses}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter type title"
            value={enteredTitle}
            required
            onChange={titleChangedHandler}
            onBlur={titleBlurHandler}
          />
        </div>

        <div className={descNameClasses}>
          <label>Desc</label>
          <textarea
            value={enteredDesc}
            placeholder="Write description of type"
            maxLength="128"
            required
            onChange={descChangedHandler}
            onBlur={descBlurHandler}
          />
        </div>

        <div className={styles["type-form__actions"]}>
          <Button type="submit">Add Type</Button>
        </div>
      </div>
    </form>
  );
}

export default AddType;
