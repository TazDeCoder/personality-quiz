import { useState } from "react";

import styles from "./TypeForm.module.css";
import AddIcon from "../UI/AddIcon";

function AddType(props) {
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
    const typeFoundIdx = props.types.findIndex(
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
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles["type-form__action"]}>
        <p>New Type</p>
        <div onClick={submitHandler}>
          <AddIcon>Add Type</AddIcon>
        </div>
      </div>

      <div className={styles["type-form__control"]}>
        <div>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter type title"
            value={inputTitle}
            required
            onChange={typeTitleChangeHandler}
          />
        </div>

        <div>
          <label>Desc</label>
          <textarea
            value={inputDesc}
            placeholder="Write description of type"
            maxLength="128"
            required
            onChange={typeDescChangeHandler}
          />
        </div>
      </div>
    </form>
  );
}

export default AddType;
