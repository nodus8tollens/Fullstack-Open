/* eslint-disable react/prop-types */
import { useState } from "react";

const Header = (props) => {
  return (
    <>
      <h1>{props.text}</h1>
    </>
  );
};

const Button = (props) => {
  return (
    <>
      <button onClick={props.handleClick}>{props.text}</button>
    </>
  );
};

const Display = (props) => {
  return (
    <>
      <p>
        {props.text} {props.score}
      </p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleButtonClick = (score, setScore) => {
    return () => setScore(score + 1);
  };

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={handleButtonClick(good, setGood)} />
      <Button
        text="neutral"
        handleClick={handleButtonClick(neutral, setNeutral)}
      />
      <Button text="bad" handleClick={handleButtonClick(bad, setBad)} />
      <Header text="statistics" />
      <Display text="good" score={good} />
      <Display text="neutral" score={neutral} />
      <Display text="bad" score={bad} />
      <Display text="all" score={good + neutral + bad} />
      <Display text="average" score={(good - bad) / (good + neutral + bad)} />
      <Display text="positive" score={good / (good + neutral + bad)} />
    </div>
  );
};

export default App;
