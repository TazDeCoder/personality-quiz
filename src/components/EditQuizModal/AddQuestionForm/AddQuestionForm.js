import { useState, useContext } from "react";

import styles from "./AddQuestionForm.module.css";
// COMPONENTS
import AddIcon from "../../UI/Icons/AddIcon";
import RemoveIcon from "../../UI/Icons/RemoveIcon";
import Button from "../../UI/Button/Button";
import ListItem from "../../UI/ListItem/ListItem";
import Input from "../../UI/Input/Input";
// CONTEXTS
import QuizContext from "../../../store/quiz-context";
// CUSTOM HOOKS
import useInput from "../../../hooks/use-input";

function QuizForm(props) {
  ////////////////////////////////////////////////
  ////// Declaring states and context
  ////// (+ conditional classes)
  ///////////////////////////////////////////////

  const quizCtx = useContext(QuizContext);

  const initialTypesState = quizCtx.types.map((type) => {
    return {
      id: type._id,
      title: type.title,
      isChecked: false,
    };
  });

  const [inputQuestions, setInputQuestions] = useState(quizCtx.questions);
  const [inputAnswers, setInputAnswers] = useState([]);
  const [inputTypes, setInputTypes] = useState(initialTypesState);

  // PROMPT STATE + HANDLERS
  const {
    value: enteredPrompt,
    hasErrors: enteredPromptHasErrors,
    inputChangeHandler: promptChangedHandler,
    inputBlurHandler: promptBlurHandler,
    inputResetHandler: resetEnteredPrompt,
  } = useInput((value) => value.trim().length !== 0);
  // PROMPT CLASSES
  const promptInputClasses = enteredPromptHasErrors ? styles.invalid : "";

  // ANSWER STATE + HANDLERS
  const {
    value: enteredAnswer,
    hasErrors: enteredAnswerHasErrors,
    inputChangeHandler: answerChangedHandler,
    inputBlurHandler: answerBlurHandler,
    inputResetHandler: resetEnteredAnswer,
  } = useInput((value) => value.trim().length !== 0);
  // ANSWER CLASSES
  const answerInputClasses = enteredAnswerHasErrors ? styles.invalid : "";

  ////////////////////////////////////////////////
  ////// Event handlers
  ///////////////////////////////////////////////

  // STATE UPDATING HANDLERS

  const typesChangeHandler = (e) => {
    setInputTypes((prevTypes) => {
      // Checking if type already exists
      const existingTypeIdx = prevTypes.findIndex(
        (type) => type.title.toLowerCase() === e.target.value
      );
      if (existingTypeIdx === -1) return;
      // Update selected type
      const updatedTypes = [...prevTypes];
      updatedTypes[existingTypeIdx].isChecked = e.target.checked;
      return updatedTypes;
    });
  };

  const removeAnswerHandler = (answerId) => {
    setInputAnswers((prevAnswers) => {
      // Checking if answer already exists
      const existingAnswerIdx = prevAnswers.findIndex(
        (answer) => answer._id === answerId
      );
      if (existingAnswerIdx === -1) return;
      // Remove selected answer
      const updatedAnswers = [...prevAnswers];
      updatedAnswers.splice(existingAnswerIdx, 1);
      return updatedAnswers;
    });
  };

  // DATA PROCESSING HANDLERS

  const addAnswerHandler = () => {
    const filteredTypes = inputTypes.filter((type) => type.isChecked);
    // Checking fields and stored inputs for data validity
    if (filteredTypes.length === 0) {
      props.onError({
        title: "No types checked",
        message: "Must select a type that this answer belongs to (min 1)",
      });
      return;
    }

    if (inputAnswers.length > 3) {
      props.onError({
        title: "Answers limit reached",
        message: "Remove an existing answer to add your answer (max 4)",
      });
      return;
    }

    if (enteredAnswer.trim().length === 0) {
      props.onError({
        title: "Invalid answer",
        message: "Must specify a valid answer for the question",
      });
      return;
    }
    // Extract title from types
    const typesTitle = filteredTypes.map((type) => type.title.toLowerCase());
    // Data provided is valid. Create answer data object
    const answerData = {
      text: enteredAnswer,
      types: typesTitle,
    };
    // Update answers state
    setInputAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.concat(answerData);
      return updatedAnswers;
    });
    // Reset types state
    setInputTypes((prevTypes) =>
      prevTypes.map((type) => {
        return {
          ...type,
          isChecked: false,
        };
      })
    );
    // Clear input field
    resetEnteredAnswer();
  };

  const addPromptHandler = () => {
    // Checking fields and stored inputs for data validity
    if (inputAnswers.length === 0) {
      props.onError({
        title: "No answers provided",
        message: "Must create answers for the question (min 1)",
      });
      return;
    }

    if (enteredPrompt.trim().length === 0) {
      props.onError({
        title: "Invalid prompt",
        message: "Must specify a valid prompt for the question",
      });
      return;
    }
    // Data provided is valid. Create question data object
    const questionData = {
      prompt: enteredPrompt,
      answers: inputAnswers,
    };
    // Update questions state
    setInputQuestions((prevQuestions) => {
      const updatedQuestions = prevQuestions.concat(questionData);
      return updatedQuestions;
    });
    // Handle question data
    props.onUpdateModifiedQuestions(questionData);
    // Clear answers state
    setInputAnswers([]);
    // Clear input field
    resetEnteredPrompt();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let questionsData = [];
    // Checking stored inputs for data validity
    for (const iptQuestion of inputQuestions) {
      // Checking if any new questions are added
      if (
        quizCtx.questions.some((question) => iptQuestion._id === question._id)
      )
        continue;
      else questionsData.push(iptQuestion);
    }
    // Check if any new questions are added
    if (questionsData.length === 0) {
      props.onClose();
      return;
    }
    // Handle questions data
    questionsData.map((questionData) => props.onAddQuestion(questionData));
    // Close modal window
    props.onClose();
  };

  const answersContent = inputAnswers.map((answer, idx) => {
    return (
      <li key={answer._id}>
        <ListItem
          key={Math.random().toString()}
          title={`Answer ${idx + 1}: ${answer.text}`}
        />

        <Button onClick={removeAnswerHandler.bind(null, answer._id)}>
          <RemoveIcon />
        </Button>
      </li>
    );
  });

  const typesContent =
    inputTypes.length > 0 ? (
      inputTypes.map((type) => {
        return (
          <li key={type.id}>
            <Input
              id={type.id}
              label={type.title}
              type={"checkbox"}
              value={type.title.toLowerCase()}
              onChange={typesChangeHandler}
              input={{
                checked: type.isChecked,
              }}
            />
          </li>
        );
      })
    ) : (
      <p>No types created</p>
    );

  return (
    <form onSubmit={submitHandler}>
      <div className={styles["question-form__controls"]}>
        <div className={styles["question-form__control"]}>
          <Input
            id={"prompt"}
            className={promptInputClasses}
            label={"Prompt"}
            type={"text"}
            value={enteredPrompt}
            onChange={promptChangedHandler}
            input={{
              placeholder: "Enter question prompt",
              onBlur: promptBlurHandler,
            }}
          />

          <Button onClick={addPromptHandler}>
            <AddIcon />
          </Button>
        </div>

        <div className={styles["question-form__answers"]}>
          <ul>{answersContent}</ul>
        </div>

        <div className={styles["question-form__control"]}>
          <Input
            id={"answer"}
            className={answerInputClasses}
            label={"Answer"}
            type={"text"}
            value={enteredAnswer}
            onChange={answerChangedHandler}
            input={{
              placeholder: "Enter answer to prompt",
              onBlur: answerBlurHandler,
            }}
          />

          <Button onClick={addAnswerHandler}>
            <AddIcon />
          </Button>
        </div>

        <div className={styles["question-form__control"]}>
          <p>Types</p>
          <ul>{typesContent}</ul>
        </div>

        <div className={styles["question-form__actions"]}>
          <Button type="submit" disabled={!props.isQuizModified}>
            Save Questions
          </Button>
        </div>
      </div>
    </form>
  );
}

export default QuizForm;
