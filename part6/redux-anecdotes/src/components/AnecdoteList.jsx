import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  // useSelector is a hook from react-redux that allows us
  // to extract data from the Redux store state.
  // Additionally, it filters the anecdotes based on the state of the filter.
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });

  anecdotes.sort((a, b) => b.votes - a.votes);

  // useDispatch is a hook from react-redux that returns
  // a reference to the dispatch function from the Redux store.
  const dispatch = useDispatch();

  // Function/React handler for voting on an anecdote
  const vote = (id, content) => {
    // Dispatch the VOTE_ANECDOTE action with
    // the id of the anecdote to be voted
    dispatch(voteAnecdote(id));
    // Dispatches a notification
    dispatch(setNotification(`Voted for anecdote: "${content}"`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
