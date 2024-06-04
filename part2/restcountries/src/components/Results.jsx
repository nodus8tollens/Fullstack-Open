/* eslint-disable react/prop-types */

import Display from "./Display";

const Results = (props) => {
  return (
    <>
      {" "}
      {props.countries.length > 10 ? (
        <p>Too many matches, specify another filters</p>
      ) : props.countries.length === 1 ? (
        <Display country={props.countries[0]} />
      ) : (
        <ul>
          {props.countries.map((country) => {
            return <li key={country.cca3}>{country.name.common}</li>;
          })}
        </ul>
      )}
    </>
  );
};

export default Results;
