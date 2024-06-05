/* eslint-disable react/prop-types */
const Display = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <br />
      <p>
        <b>Languages:</b>
      </p>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <br />
      <img src={country.flags.png} alt={country.flags.alt} />
    </>
  );
};

export default Display;
