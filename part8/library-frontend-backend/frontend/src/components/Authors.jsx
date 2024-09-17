import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS } from "../queries";
import { v4 as uuidv4 } from "uuid";
import { EDIT_AUTHOR } from "../queries";
import Select from "react-select";

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

  const authorOptions = authors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  console.log(authorOptions);

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "30%",
    padding: "20px",
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
          <Select
            options={authorOptions}
            onChange={(selectedOption) => setName(selectedOption.value)}
            value={authorOptions.find((option) => option.value === name)}
          />
        </fieldset>
        <fieldset style={fieldsetStyle}>
          <label htmlFor="year">year</label>
          <input
            name="year"
            type="number"
            onChange={({ target }) => setYear(target.value)}
            value={year}
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
