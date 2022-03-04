import { useState, useContext } from "react";

import styles from "./AddQuestionForm.module.css";
import AddIcon from "../../UI/Icons/AddIcon";
import RemoveIcon from "../../UI/Icons/RemoveIcon";
import Button from "../../UI/Button/Button";
import ListItem from "../../UI/ListItem/ListItem";
import QuizContext from "../../../store/quiz-context";
import useInput from "../../../hooks/use-input";

function QuizForm(props) {
  const quizCtx = useContext(QuizContext);

  const initialTypesState = quizCtx.types.map((type) => {
    return {
      title: type.title,
      isChecked: false,
    };
  });

  const [inputQuestions, setInputQuestions] = useState(quizCtx.questions);
  const [inputAnswers, setInputAnswers] = useState([]);
  const [inputTypes, setInputTypes] = useState(initialTypesState);

  const {
    value: enteredPrompt,
    hasErrors: enteredPromptHasErrors,
    inputChangeHandler: promptChangedHandler,
    inputBlurHandler: promptBlurHandler,
    inputResetHandler: resetEnteredPrompt,
  } = useInput((value) => value.trim().length !== 0);

  const promptNameClasses = enteredPromptHasErrors
    ? `${styles["edit-quiz__control"]} ${styles.invalid}`
    : styles["edit-quiz__control"];

  const {
    value: enteredAnswer,
    hasErrors: enteredAnswerHasErrors,
    inputChangeHandler: answerChangedHandler,
    inputBlurHandler: answerBlurHandler,
    inputResetHandler: resetEnteredAnswer,
  } = useInput((value) => value.trim().length !== 0);

  const answerNameClasses = enteredAnswerHasErrors
    ? `${styles["edit-quiz__control"]} ${styles.invalid}`
    : styles["edit-quiz__control"];

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

  const addAnswerHandler = () => {
    const filteredTypes = inputTypes.filter((type) => type.isChecked);
    // Checking field validity
    if (filteredTypes.length === 0) {
      props.onError({
        title: "No types checked",
        message: "Must select a type that this answer belongs to (min 1)",
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

    if (inputAnswers.length > 3) {
      props.onError({
        title: "Answers limit reached",
        message: "Remove an existing answer to add your answer (max 4)",
      });
      return;
    }
    // Extract title from types
    const typesTitle = filteredTypes.map((type) => type.title.toLowerCase());
    // Data provided is valid. Create answer object
    const answerData = {
      id: Math.random().toString(),
      text: enteredAnswer,
      types: typesTitle,
    };

    // Update answers state
    setInputAnswers((prevAnswers) => {
      return [...prevAnswers, answerData];
    });
    // Update types state
    setInputTypes((prevTypes) => {
      return prevTypes.map((type) => {
        return {
          ...type,
          isChecked: false,
        };
      });
    });
    // Clear input field
    resetEnteredAnswer();
  };

  const removeAnswerHandler = (answerId) => {
    setInputAnswers((prevAnswers) => {
      // Checking if answer already exists
      const existingAnswerIdx = prevAnswers.findIndex(
        (answer) => answer.id === answerId
      );
      if (existingAnswerIdx === -1) {
        return;
      }
      // Remove selected answer
      const updatedAnswers = [...prevAnswers];
      updatedAnswers.pop(updatedAnswers[existingAnswerIdx]);
      // Return updated types
      return updatedAnswers;
    });
  };

  const addPromptHandler = () => {
    // Checking field validity
    if (enteredPrompt.trim().length === 0) {
      props.onError({
        title: "Invalid prompt",
        message: "Must specify a valid prompt for the question",
      });
      return;
    }

    if (inputAnswers.length === 0) {
      props.onError({
        title: "No answers provided",
        message: "Must create answers for the question (min 1)",
      });
      return;
    }
    // Data provided is valid. Create question object
    const questionData = {
      id: Math.random().toString(),
      prompt: enteredPrompt,
      answers: inputAnswers,
    };

    // Update questions state
    setInputQuestions((prevQuestions) => {
      return [...prevQuestions, questionData];
    });
    // Cleae answers state
    setInputAnswers([]);
    // Clear input field
    resetEnteredPrompt();
    // Handle question data
    props.onUpdateModifiedQuestions(questionData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let questionsData = [];
    // Checking field validity
    for (const iptQuestion of inputQuestions) {
      // Checking if any new questions are added
      if (quizCtx.questions.some((question) => iptQuestion.id === question.id))
        continue;
      else questionsData.push(iptQuestion);
    }
    // Close modal window if no new questions are added
    if (questionsData.length === 0) {
      props.onClose();
      return;
    }
    // Handle question data
    questionsData.map((questionData) => props.onAddNewQuestion(questionData));
    // Close modal window
    props.onClose();
  };

  const currentAnswersContent = (
    <div className={styles["edit-quiz__answers"]}>
      <ul>
        {inputAnswers.map((answer, idx) => {
          return (
            <li>
              <ListItem
                key={Math.random().toString()}
                title={`Answer ${idx + 1}: ${answer.text}`}
              />

              <Button onClick={removeAnswerHandler.bind(null, answer.id)}>
                <RemoveIcon />
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  const formContent = (
    <div className={styles["edit-quiz__controls"]}>
      <div className={promptNameClasses}>
        <label>Prompt</label>
        <input
          type="text"
          value={enteredPrompt}
          placeholder="Enter question prompt"
          onChange={promptChangedHandler}
          onBlur={promptBlurHandler}
        />

        <Button onClick={addPromptHandler}>
          <AddIcon />
        </Button>
      </div>

      {currentAnswersContent}

      <div className={answerNameClasses}>
        <label>Answer</label>
        <input
          type="text"
          value={enteredAnswer}
          placeholder="Enter answer to prompt"
          onChange={answerChangedHandler}
          onBlur={answerBlurHandler}
        />

        <Button onClick={addAnswerHandler}>
          <AddIcon />
        </Button>
      </div>

      <div className={styles["edit-quiz__control"]}>
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

      <div className={styles["edit-quiz__actions"]}>
        <Button type="submit">Update Quiz</Button>
      </div>
    </div>
  );

  return <form onSubmit={submitHandler}>{formContent}</form>;
}

export default QuizForm;
