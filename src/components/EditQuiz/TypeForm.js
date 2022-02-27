import { useState, useContext } from "react";

import styles from "./TypeForm.module.css";
import Button from "../UI/Button";
import QuizContext from "../../store/quiz-context";

function AddType(props) {
  const quizCtx = useContext(QuizContext);

  const [inputTitle, setInputTitle] = useState("");
  const [inputDesc, setInputDesc] = useState("");

  const typeTitleChangeHandler = (e) => {
    setInputTitle(e.target.value);
  };

  const typeDescChangeHandler = (e) => {
    setInputDesc(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Checking field validity
    if (inputTitle.trim().length === 0) {
      props.onError({
        title: "Invalid title",
        message: "Must specify a valid title for the type",
      });
      return;
    }
    if (inputDesc.trim().length === 0) {
      props.onError({
        title: "Invalid description",
        message: "Must specify a valid description for the type",
      });
      return;
    }
    // Checking if type already exists
    const typeFoundIdx = quizCtx.types.findIndex(
      (type) => type.title.toLowerCase() === inputTitle.toLowerCase()
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
      title: inputTitle,
      description: inputDesc,
    };
    // Handle type data
    props.onAddNewType(typeData);
    // Clear input fields
    setInputTitle("");
    setInputDesc("");
    // Close modal window
    props.onClose();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles["type-form__controls"]}>
        <div className={styles["type-form__control"]}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter new type title"
            value={inputTitle}
            required
            onChange={typeTitleChangeHandler}
          />
        </div>

        <div className={styles["type-form__control"]}>
          <label>Desc</label>
          <textarea
            value={inputDesc}
            placeholder="Write a description of the type"
            maxLength="128"
            required
            onChange={typeDescChangeHandler}
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
