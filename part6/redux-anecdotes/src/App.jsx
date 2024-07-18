import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";

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
      <AnecdoteForm />
    </div>
  );
};

export default App;
