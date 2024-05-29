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

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  } else {
    return (
      <>
        <Display text="all" score={props.good + props.neutral + props.bad} />
        <Display
          text="average"
          score={
            (props.good - props.bad) / (props.good + props.neutral + props.bad)
          }
        />
        <Display
          text="positive"
          score={props.good / (props.good + props.neutral + props.bad)}
        />
      </>
    );
  }
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
