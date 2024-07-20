import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    const filter = event.target.value;
    dispatch(setFilter(filter));
  };

  return (
    <>
      <label htmlFor="anecdoteFilter">filter: </label>
      <input type="text" name="anecdoteFilter" onChange={handleFilterChange} />
    </>
  );
};

export default AnecdoteFilter;
