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

const StatisticLine = (props) => {
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
        <table>
          <tr>
            <td>
              <StatisticLine text="good" />
            </td>
            <td>
              <StatisticLine score={props.good} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="neutral" />
            </td>
            <td>
              <StatisticLine score={props.neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="bad" />
            </td>
            <td>
              <StatisticLine score={props.bad} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="all" />
            </td>
            <td>
              <StatisticLine score={props.good + props.neutral + props.bad} />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="average" />
            </td>
            <td>
              <StatisticLine
                score={
                  (props.good - props.bad) /
                  (props.good + props.neutral + props.bad)
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="positive" />
            </td>
            <td>
              <StatisticLine
                score={props.good / (props.good + props.neutral + props.bad)}
              />
            </td>
          </tr>
        </table>
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

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
