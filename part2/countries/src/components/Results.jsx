/* eslint-disable react/prop-types */
const Results = ({ countries, handleButtonClick }) => {
  return (
    <ul>
      {countries.map((country) => (
        <div key={country.cca3}>
          <li style={{ display: "inline-block" }}>{country.name.common}</li>
          <button
            onClick={() => handleButtonClick(country)}
            style={{ display: "inline-block" }}
          >
            show
          </button>
        </div>
      ))}
    </ul>
  );
};

export default Results;
