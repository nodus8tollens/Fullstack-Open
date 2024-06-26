/* eslint-disable react/prop-types */
import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <>
      <br />
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

export default Content;
