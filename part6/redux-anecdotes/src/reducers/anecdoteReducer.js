import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

// Initial anecdotes/state
const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

// Generates unique id's
const generateId = () => (100000 * Math.random()).toFixed(0);

// Converts anecdote string into object
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: generateId(),
    votes: 0,
  };
};

// Initializes state
const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    appendAnecdote: (state, action) => {
      state.push(action.payload);
    },
    updateAnecdote: (state, action) => {
      const id = action.payload.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      if (anecdoteToChange) {
        anecdoteToChange.votes = action.payload.votes;
      }
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    },
  },
});

export const { appendAnecdote, setAnecdotes, updateAnecdote } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find((a) => a.id === id);
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const newAnecdote = await anecdoteService.updateOne(
      id,
      updatedAnecdote.votes
    );
    dispatch(updateAnecdote(newAnecdote));
  };
};

export default anecdoteSlice.reducer;
