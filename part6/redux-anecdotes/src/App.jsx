import { useSelector, useDispatch } from "react-redux";

import { createAnecdote, voteAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  // useSelector is a hook from react-redux that allows us
  // to extract data from the Redux store state.
  const anecdotes = useSelector((state) => state);
  anecdotes.sort((a, b) => b.votes - a.votes);

  // useDispatch is a hook from react-redux that returns
  // a reference to the dispatch function from the Redux store.
  const dispatch = useDispatch();

  // Function/React handler for voting on an anecdote
  const vote = (id) => {
    console.log("vote", id);
    // Dispatch the VOTE_ANECDOTE action with
    // the id of the anecdote to be voted
    dispatch(voteAnecdote(id));
  };

  // Handler for creating new anecdotes
  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    // Creates and dispatches a CREATE_ANECDOTE action
    // with the appropriate payload
    dispatch(createAnecdote(content));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
