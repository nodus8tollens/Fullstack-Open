/* eslint-disable react/prop-types */
const Total = ({ parts }) => {
  let sum = 0;
  parts.forEach((part) => {
    sum = sum + part.exercises;
  });
  return (
    <>
      <p>
        <b>total of {sum} exercises</b>
      </p>
    </>
  );
};

export default Total;
