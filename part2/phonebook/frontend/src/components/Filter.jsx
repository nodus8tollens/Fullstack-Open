/* eslint-disable react/prop-types */
const Filter = (props) => {
  return (
    <>
      <div>
        filter shown with <input onChange={props.handleFilter} />
      </div>
    </>
  );
};

export default Filter;
