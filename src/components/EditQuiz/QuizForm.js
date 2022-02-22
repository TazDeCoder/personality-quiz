import { useState } from "react";

import styles from "./QuizForm.module.css";
import Button from "../UI/Button";
import AddIcon from "../UI/AddIcon";
import ListItem from "../UI/ListItem";

function QuizForm(props) {
  // Initial state data
  const initialTypesData =
    props.quiz?.types.map((type) => {
      return {
        title: type.title,
        isChecked: false,
      };
    }) ?? [];
  const initialQuestionsData = props.quiz?.questions ?? [];

  const [inputQuestions, setInputQuestions] = useState(initialQuestionsData);
  const [inputPrompt, setInputPrompt] = useState("");
  const [inputAnswer, setInputAnswer] = useState("");
  const [inputAnswers, setInputAnswers] = useState([]);
  const [inputTypeTitle, setInputTypeTitle] = useState("");
  const [inputTypeDesc, setInputTypeDesc] = useState("");
  const [showTypeForm, setShowTypeForm] = useState(false);
  const [inputTypes, setInputTypes] = useState(initialTypesData);

  const toggleTypeFormHandler = () => {
    setShowTypeForm(!showTypeForm);
  };

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

  const typesChangeHandler = (e) => {
    setInputTypes((prevTypes) => {
      // Checking if type already exists
      const typeFoundIdx = prevTypes.findIndex(
        (type) => type.title.toLowerCase() === e.target.value
      );
      if (typeFoundIdx === -1) {
        return;
      }
      // Update selected type
      const updatedTypes = [...prevTypes];
      updatedTypes[typeFoundIdx].isChecked = e.target.checked;
      // Return updated types
      return updatedTypes;
    });
  };

  const addNewTypeHandler = () => {
    // Checking field validity
    if (inputTypeTitle.trim().length === 0) {
      return;
    }
    // Checking if type already exists
    const typeFoundIdx = inputTypes.findIndex(
      (type) => type.title.toLowerCase() === inputTypeTitle.toLowerCase()
    );
    if (typeFoundIdx !== -1) {
      return;
    }
    // Create type object
    const typeData = {
      title: inputTypeTitle,
      description: inputTypeDesc,
    };
    // Update types state
    setInputTypes((prevInputTypes) => [
      ...prevInputTypes,
      {
        title: typeData.title,
        isChecked: false,
      },
    ]);
    // Handle type data
    props.onUpdateQuizData({
      types: [typeData],
    });
    // Close type form + clear input fields
    setInputTypeTitle("");
    setInputTypeDesc("");
    setShowTypeForm(false);
  };

  const addAnswerHandler = () => {
    // Checking field validity
    const filteredTypes = inputTypes.filter((type) => type.isChecked);
    if (
      inputAnswer.trim().length === 0 ||
      inputAnswers.length > 3 ||
      filteredTypes.length === 0
    )
      return;
    // Get types title
    const typesTitle = filteredTypes.map((type) => type.title.toLowerCase());
    // Create answer object
    const answerData = {
      text: inputAnswer,
      types: typesTitle,
    };
    // Update answers state
    setInputAnswers((prevAnswers) => {
      return [...prevAnswers, answerData];
    });
    // Clear input fields
    setInputAnswer("");
    setInputTypes((prevTypes) => {
      return prevTypes.map((type) => {
        return {
          ...type,
          isChecked: false,
        };
      });
    });
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
    // Clear input fields
    setInputPrompt("");
    setInputAnswers([]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // Checking field validity
    let newQuestions = [];
    for (const iptQuestion of inputQuestions) {
      if (
        props.quiz.questions.some((question) => iptQuestion.id === question.id)
      )
        continue;
      else newQuestions.push(iptQuestion);
    }
    // Close modal if no new questions are added
    if (newQuestions.length === 0) {
      props.onClose();
      return;
    }
    // Handle questions data
    props.onUpdateQuizData({
      questions: newQuestions,
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
          <div>
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
          </div>

          <div>
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
              <Button onClick={addNewTypeHandler}>Add Type</Button>
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
