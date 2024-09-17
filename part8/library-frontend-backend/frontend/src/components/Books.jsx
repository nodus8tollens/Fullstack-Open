import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { v4 as uuidv4 } from "uuid";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={uuidv4()}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
