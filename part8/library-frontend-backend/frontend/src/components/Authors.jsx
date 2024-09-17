import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS } from "../queries";
import { v4 as uuidv4 } from "uuid";
import { EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const [name, setName] = useState("");
  const [year, setYear] = useState("");

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  };

  const fieldsetStyle = {
    border: "none",
  };

  const buttonStyle = {
    width: "auto",
    alignSelf: "flex-start",
  };

  const submit = async (event) => {
    event.preventDefault();

    try {
      await editAuthor({
        variables: { name, setBornTo: Number(year) },
      });
      setName("");
      setYear("");
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={uuidv4()}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit} style={formStyle}>
        <fieldset style={fieldsetStyle}>
          <label htmlFor="name">name</label>
          <input
            name="name"
            type="text"
            onChange={({ target }) => {
              setName(target.value);
            }}
          />
        </fieldset>
        <fieldset style={fieldsetStyle}>
          <label htmlFor="year">year</label>
          <input
            name="year"
            type="number"
            onChange={({ target }) => setYear(target.value)}
          />
        </fieldset>

        <button type="submit" style={buttonStyle}>
          update author
        </button>
      </form>
    </div>
  );
};

export default Authors;
