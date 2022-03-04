import { useRef, useContext } from "react";

import styles from "./StartQuiz.module.css";
import Button from "../UI/Button/Button";
import QuestionCard from "./QuestionCard";
import QuizContext from "../../store/quiz-context";

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
  const quizCtx = useContext(QuizContext);
  const questionsRef = useRef([]);

  const submitHandler = (e) => {
    e.preventDefault();
    let selectedAnswers = [];
    let formattedAnswers = [];
    // Get selected answers
    for (const questionRef of questionsRef.current) {
      const selectedAnswer = Array.from(questionRef.elements).find(
        (el) => el.checked
      );
      selectedAnswers.push(selectedAnswer.value);
    }
    // Format selected answers
    for (const answer of selectedAnswers) {
      const formattedAnswer = answer.includes(",") ? answer.split(",") : answer;
      formattedAnswers.push(...formattedAnswer);
    }
    // Get type based on frequently answered
    const mostFrequentType = getMostFrequent(formattedAnswers);
    const results = quizCtx.types.find(
      (type) => type.title.toLowerCase() === mostFrequentType
    );
    // Close modal window
    props.onClose();
    // Handle results data
    props.onSubmitQuizResults(results);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles["start-quiz"]}>
        <div className={styles["start-quiz__controls"]}>
          {quizCtx.questions.map((question, idx, arr) => (
            <fieldset
              ref={(el) => (questionsRef.current[idx] = el)}
              key={question.id}
            >
              <div className={styles["start-quiz__control"]}>
                <h1>{`Question ${idx + 1} / ${arr.length}`}</h1>
                <QuestionCard
                  prompt={question.prompt}
                  answers={question.answers}
                  groupName={`answer${idx + 1}`}
                />
              </div>
            </fieldset>
          ))}
        </div>
        <div className={styles["start-quiz__actions"]}>
          <Button type="submit">Get Results</Button>
        </div>
      </div>
    </form>
  );
}

export default StartQuiz;
