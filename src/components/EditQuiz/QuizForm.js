import { useState, useContext } from "react";

import styles from "./QuizForm.module.css";
import Button from "../UI/Button";
import AddIcon from "../UI/AddIcon";
import ListItem from "../UI/ListItem";
import QuizContext from "../../store/quiz-context";

function QuizForm(props) {
  const quizCtx = useContext(QuizContext);

  // Initial state data
  const initialTypesData = quizCtx.types.map((type) => {
    return {
      title: type.title,
      isChecked: false,
    };
  });
  const initialQuestionsData = quizCtx.questions;

  const [inputQuestions, setInputQuestions] = useState(initialQuestionsData);
  const [inputTypes, setInputTypes] = useState(initialTypesData);
  const [inputPrompt, setInputPrompt] = useState("");
  const [inputAnswer, setInputAnswer] = useState("");
  const [inputAnswers, setInputAnswers] = useState([]);

  const promptChangeHandler = (e) => {
    setInputPrompt(e.target.value);
  };

  const answerChangeHandler = (e) => {
    setInputAnswer(e.target.value);
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

    if (inputAnswer.trim().length === 0) {
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
    if (inputPrompt.trim().length === 0) {
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
      prompt: inputPrompt,
      answers: inputAnswers,
    };
    // Update questions state
    setInputQuestions((prevQuestions) => {
      return [...prevQuestions, questionData];
    });
    // Clear input fields
    setInputPrompt("");
    setInputAnswers([]);
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
    <div className={styles["edit-quiz__current-answers"]}>
      <ul>
        {inputAnswers.map((answer, idx) => (
          <ListItem
            key={Math.random().toString()}
            title={`Answer ${idx + 1}: ${answer.text}`}
          />
        ))}
      </ul>
    </div>
  );

  const formContent = (
    <div className={styles["edit-quiz__controls"]}>
      <div className={styles["edit-quiz__control-prompt"]}>
        <label>Prompt</label>
        <input
          type="text"
          value={inputPrompt}
          placeholder="Enter question prompt"
          onChange={promptChangeHandler}
        />

        <Button onClick={addPromptHandler}>
          <AddIcon />
        </Button>
      </div>

      {currentAnswersContent}

      <div className={styles["edit-quiz__control-answer"]}>
        <label>Answer</label>
        <input
          type="text"
          value={inputAnswer}
          placeholder="Enter an answer"
          onChange={answerChangeHandler}
        />

        <Button onClick={addAnswerHandler}>
          <AddIcon />
        </Button>
      </div>

      <div className={styles["edit-quiz__control-types"]}>
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
