const AnecdoteFilter = () => {
  const handleFilterChange = (event) => {
    const filter = event.target.value;
  };

  return (
    <>
      <label htmlFor="anecdoteFilter">filter: </label>
      <input type="text" name="anecdoteFilter" onChange={handleFilterChange} />
    </>
  );
};

export default AnecdoteFilter;
