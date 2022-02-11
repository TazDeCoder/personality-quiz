import "./QuizItem.css";

function QuizItem(props) {
  return (
    <li className="quiz-item">
      <h1 className="quiz-item__label quiz-item__label--title">
        {props.title}
      </h1>
      <button className="quiz-item__btn">Start Quiz</button>
      <p className="quiz-item__label quiz-item__label--author">
        Created By: <span className="span-bold">{props.author}</span>
      </p>
    </li>
  );
}

export default QuizItem;
