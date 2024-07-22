import { useQuery } from "@tanstack/react-query";
import { getAnecdotes } from "../services/requests";

const AnecdoteList = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  const anecdotes = result.data;

  anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => console.log("Vote")}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
