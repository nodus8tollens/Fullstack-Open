/* eslint-disable react/prop-types */
const Total = ({ parts }) => {
  const sum = parts.reduce((accumulator, currentValue) => {
    console.log(currentValue.exercises);
    return accumulator + currentValue.exercises;
  }, 0);

  return (
    <>
      <p>
        <b>total of {sum} exercises</b>
      </p>
    </>
  );
};

export default Total;
