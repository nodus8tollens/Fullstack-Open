/* eslint-disable react/prop-types */
const Search = (props) => {
  return (
    <>
      <label htmlFor="countries">Search for a country: </label>
      <input onChange={props.handleSearchChange} type="text" name="countries" />
      <p></p>
    </>
  );
};

export default Search;
