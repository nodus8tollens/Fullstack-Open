/* eslint-disable react/prop-types */
const Search = ({ handleSearchChange }) => {
  return (
    <>
      <label htmlFor="countries">Search for a country: </label>
      <input onChange={handleSearchChange} type="text" name="countries" />
      <p></p>
    </>
  );
};

export default Search;
