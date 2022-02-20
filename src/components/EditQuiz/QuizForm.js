import { useState, useEffect } from "react";

import styles from "./QuizForm.module.css";
import Button from "../UI/Button";
import AddIcon from "../UI/AddIcon";
import ListItem from "../UI/ListItem";

function QuizForm(props) {
  const initialTypesState =
    props.quiz?.types.map((type) => {
      return {
        title: type.title,
        isChecked: false,
      };
    }) ?? [];
  const initialQuestionsState = props.quiz?.questions ?? [];

  const [inputQuestions, setInputQuestions] = useState(initialQuestionsState);
  const [inputPrompt, setInputPrompt] = useState("");
  const [inputAnswer, setInputAnswer] = useState("");
  const [inputAnswers, setInputAnswers] = useState([]);
  const [inputTypeTitle, setInputTypeTitle] = useState("");
  const [inputTypeDesc, setInputTypeDesc] = useState("");
  const [typesState, setTypesState] = useState(initialTypesState);
  const [inputTypes, setInputTypes] = useState(typesState);
  const [showTypeForm, setShowTypeForm] = useState(false);

  useEffect(() => {
    setInputTypes(typesState);
  }, [typesState]);

  const promptChangeHandler = (e) => {
    setInputPrompt(e.target.value);
  };

  const answerChangeHandler = (e) => {
    setInputAnswer(e.target.value);
  };

  const typeTitleChangeHandler = (e) => {
    setInputTypeTitle(e.target.value);
  };

  const typeDescChangeHandler = (e) => {
    setInputTypeDesc(e.target.value);
  };

  const toggleTypeFormHandler = () => {
    setShowTypeForm(!showTypeForm);
  };

  const typesChangeHandler = (e) => {
    setInputTypes((prevTypes) => {
      const typeFoundIdx = prevTypes.findIndex(
        (type) => type.title.toLowerCase() === e.target.value
      );

      if (typeFoundIdx === -1) return;

      const updatedTypes = [...prevTypes];
      updatedTypes[typeFoundIdx].isChecked = e.target.checked;

      return updatedTypes;
    });
  };

  const addTypeHandler = () => {
    // Checking field validity
    if (inputTypeTitle.trim().length === 0) {
      return;
    }
    // Create type object
    const typeData = {
      title: inputTypeTitle,
      description: inputTypeDesc,
    };
    // Updates types state
    setTypesState((prevTypesState) => [
      ...prevTypesState,
      {
        title: typeData.title,
        isChecked: false,
      },
    ]);
    // Handle question array
    props.onUpdateQuizData({
      types: [typeData],
    });
    // Close type form + clear fields
    setInputTypeTitle("");
    setInputTypeDesc("");
    setShowTypeForm(false);
  };

  const addAnswerHandler = () => {
    // Filter input types
    const filteredTypes = inputTypes.filter((type) => type.isChecked);
    // Checking field validity
    if (
      inputAnswer.trim().length === 0 ||
      inputAnswers.length > 3 ||
      filteredTypes.length === 0
    )
      return;
    const typesTitle = filteredTypes.map((type) => type.title.toLowerCase());
    // Create answer object
    const answerData = {
      text: inputAnswer,
      types: typesTitle,
    };
    // Update answers array
    setInputAnswers((prevAnswers) => {
      return [...prevAnswers, answerData];
    });
    // Clear input fields
    setInputAnswer("");
    setInputTypes(initialTypesState);
  };

  const addPromptHandler = () => {
    // Checking field validity
    if (inputPrompt.trim().length === 0 || inputAnswers.length === 0) return;
    // Create question object
    const questionData = {
      id: Math.random().toString(),
      prompt: inputPrompt,
      answers: inputAnswers,
    };
    // Update questions array
    setInputQuestions((prevQuestions) => {
      return [...prevQuestions, questionData];
    });
    // Clear input field
    setInputPrompt("");
    setInputAnswers([]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Checking field validity
    const filteredQuestions = inputQuestions.filter((question) => {
      for (const q of Object.values(props.quiz.questions)) {
        if (q.id !== question.id) return true;
      }
    });

    if (filteredQuestions.length === 0) {
      props.onClose();
      return;
    }

    // Handle question array
    props.onUpdateQuizData({
      questions: filteredQuestions,
    });
    // Close modal
    props.onClose();
  };

  return (
    <form onSubmit={submitHandler}>
      <ul>
        {inputQuestions.map((question, idx) => (
          <ListItem
            key={Math.random().toString()}
            title={`Question ${idx + 1}: ${question.prompt}`}
          />
        ))}
      </ul>

      <ul>
        {inputAnswers.map((answer, idx) => (
          <ListItem
            key={Math.random().toString()}
            title={`Answer ${idx + 1}: ${answer.text}`}
          />
        ))}
      </ul>

      <div className={styles["add-quiz__controls"]}>
        <div className={styles["add-quiz__control"]}>
          <div className={styles["add-quiz__control-prompt"]}>
            <label>Prompt</label>
            <input
              type="text"
              value={inputPrompt}
              placeholder="Enter question prompt"
              onChange={promptChangeHandler}
            />
          </div>

          <div
            className={styles["add-quiz__control-action"]}
            onClick={addPromptHandler}
          >
            <AddIcon />
          </div>

          <div className={styles["add-quiz__control-answer"]}>
            <label>Answer</label>
            <input
              type="text"
              value={inputAnswer}
              placeholder="Enter an answer"
              onChange={answerChangeHandler}
            />
          </div>

          <div
            className={styles["add-quiz__control-action"]}
            onClick={addAnswerHandler}
          >
            <AddIcon />
          </div>

          <div className={styles["add-quiz__control-types"]}>
            <p>Types</p>
            <ul>
              {inputTypes.map((type) => {
                return (
                  <li key={Math.random().toString()}>
                    <label>{type.title}</label>
                    <input
                      type="checkbox"
                      onChange={typesChangeHandler}
                      value={type.title.toLowerCase()}
                      checked={type.isChecked}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          {showTypeForm && (
            <div className={styles["add-quiz__control-type"]}>
              <p>New Type</p>

              <div>
                <label>Title</label>
                <input
                  type="text"
                  placeholder="Enter type title"
                  value={inputTypeTitle}
                  onChange={typeTitleChangeHandler}
                />
              </div>

              <div>
                <label>Desc</label>
                <textarea
                  value={inputTypeDesc}
                  placeholder="Write description of type"
                  maxLength="128"
                  onChange={typeDescChangeHandler}
                />
              </div>
            </div>
          )}
        </div>

        <div className={styles["add-quiz__actions"]}>
          {!showTypeForm && (
            <Button onClick={toggleTypeFormHandler}>Add New Type</Button>
          )}
          {showTypeForm && (
            <div>
              <Button onClick={addTypeHandler}>Add Type</Button>
              <Button onClick={toggleTypeFormHandler}>Close</Button>
            </div>
          )}
          <Button type="submit">Save Quiz</Button>
        </div>
      </div>
    </form>
  );
}

export default QuizForm;
