import { useRef, useContext } from "react";

import styles from "./StartQuiz.module.css";
import Button from "../UI/Button/Button";
import QuestionCard from "./QuestionCard";
import QuizContext from "../../store/quiz-context";

////////////////////////////////////////////////
////// Helper functions
///////////////////////////////////////////////

function getMostFrequent(arr) {
  const hashmap = arr.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(hashmap).reduce((a, b) =>
    hashmap[a] > hashmap[b] ? a : b
  );
}

function StartQuiz(props) {
  ////////////////////////////////////////////////
  ////// Declaring ref and context
  ///////////////////////////////////////////////

  const quizCtx = useContext(QuizContext);

  const questionsRef = useRef([]);

  ////////////////////////////////////////////////
  ////// Event handlers
  ///////////////////////////////////////////////

  const submitHandler = (e) => {
    e.preventDefault();
    let selectedAnswers = [];
    let filteredAnswers = [];
    // Get selected answers
    for (const questionRef of questionsRef.current) {
      const selectedAnswer = Array.from(questionRef.elements).find(
        (el) => el.checked
      );
      selectedAnswers.push(selectedAnswer.value);
    }
    // Format selected answers
    for (const answer of selectedAnswers) {
      // Check for answer with multiple types
      if (answer.includes(",")) {
        const formattedAnswer = answer.split(",");
        filteredAnswers.push(...formattedAnswer);
      }
      filteredAnswers.push(answer);
    }
    // Get type based on frequently answered
    const mostFrequentType = getMostFrequent(filteredAnswers);
    // Get results based on most frequent type
    const results = quizCtx.types.find(
      (type) => type.title.toLowerCase() === mostFrequentType
    );
    // Handle results data
    props.onSubmitQuizResults(results);
    // Close modal window
    props.onClose();
  };

  const controlsContent = quizCtx.questions.map((question, idx, arr) => (
    <fieldset ref={(el) => (questionsRef.current[idx] = el)} key={question.id}>
      <div className={styles["start-quiz__control"]}>
        <h1>{`Question ${idx + 1} / ${arr.length}`}</h1>
        <QuestionCard
          prompt={question.prompt}
          answers={question.answers}
          groupName={`answer${idx + 1}`}
        />
      </div>
    </fieldset>
  ));

  return (
    <form onSubmit={submitHandler}>
      <div className={styles["start-quiz"]}>
        <div className={styles["start-quiz__controls"]}>{controlsContent}</div>
        <div className={styles["start-quiz__actions"]}>
          <Button type="submit">Get Results</Button>
        </div>
      </div>
    </form>
  );
}

export default StartQuiz;
