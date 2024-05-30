/* eslint-disable react/prop-types */
import { useState } from "react";

const DisplayVotes = ({ anecdotes, points }) => {
  const mostVotedAnecdote = () => {
    return points.indexOf(Math.max(...points));
  };

  const mostVotedIndex = mostVotedAnecdote();

  if (Math.max(...points) === 0) {
    return <div>No available data.</div>;
  } else {
    return (
      <>
        <div>{anecdotes[mostVotedIndex]}</div>
        <div>has {points[mostVotedIndex]} votes.</div>
      </>
    );
  }
};

const DisplayAnecdote = ({ anecdotes, selected }) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
    </>
  );
};

const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const handleRandomClick = () => {
    let rnd;
    do {
      rnd = Math.floor(Math.random() * anecdotes.length);
    } while (rnd === selected);
    setSelected(rnd);
  };

  const handleVoteClick = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <>
      <DisplayAnecdote anecdotes={anecdotes} selected={selected} />

      <Button handleClick={handleVoteClick} text={"vote"}></Button>
      <Button handleClick={handleRandomClick} text={"next anecdote"}></Button>

      <h1>Anecdote with most votes</h1>
      <DisplayVotes anecdotes={anecdotes} points={points} />
    </>
  );
};

export default App;
