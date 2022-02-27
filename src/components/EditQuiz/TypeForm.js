import { useContext, useState } from "react";

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
      return;
    }
    // Checking if type already exists
    const typeFoundIdx = quizCtx.types.findIndex(
      (type) => type.title.toLowerCase() === inputTitle.toLowerCase()
    );
    if (typeFoundIdx !== -1) {
      return;
    }
    // Create type object
    const typeData = {
      title: inputTitle,
      description: inputDesc,
    };
    // Handle type data
    props.onAddNewType(typeData);
    // Clear input fields
    setInputTitle("");
    setInputDesc("");
    // Close modal
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
