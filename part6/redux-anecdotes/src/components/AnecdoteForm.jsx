import { createAnecdote } from "../services/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  // Handler for creating new anecdotes
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length < 5) {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: "Anecdote must be longer than five letters.",
      });
      return;
    }
    event.target.anecdote.value = "";

    newAnecdoteMutation.mutate({ content, votes: 0 });

    notificationDispatch({
      type: "SET_NOTIFICATION",
      payload: `Created new anecdote: "${content}"`,
    });
    setTimeout(() => {
      notificationDispatch({ type: "CLEAR_NOTIFICATION" });
    }, 5000);
  };

  return (
    <>
      {" "}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
