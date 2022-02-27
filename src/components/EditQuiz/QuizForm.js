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
    let questionsData = [];
    // Checking field validity
    for (const iptQuestion of inputQuestions) {
      if (quizCtx.questions.some((question) => iptQuestion.id === question.id))
        continue;
      else questionsData.push(iptQuestion);
    }
    // Close modal if no new questions are added
    if (questionsData.length === 0) {
      props.onClose();
      return;
    }
    // Handle questions data
    questionsData.map((questionData) => props.onAddNewQuestion(questionData));
    // Close modal
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
