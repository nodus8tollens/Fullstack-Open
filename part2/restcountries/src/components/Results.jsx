/* eslint-disable react/prop-types */
const Results = (props) => {
  return (
    <>
      <ul>
        {props.countries.map((country) => {
          return <li key={country.cca3}>{country.name.common}</li>;
        })}
      </ul>
    </>
  );
};

export default Results;
