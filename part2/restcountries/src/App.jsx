import { useState } from "react";
import { getCountry } from "./services/countries";

import Search from "./components/Search";
import Results from "./components/Results";
import Display from "./components/Display";

function App() {
  const [searchString, setSearchString] = useState("");
  const [countries, setCountries] = useState([]);
  const [showDisplay, setShowDisplay] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchString(query);
    setSelectedCountry(null);

    getCountry(query)
      .then((filteredCountries) => {
        setCountries(filteredCountries);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleButtonClick = (country) => {
    setShowDisplay(true);
    setSelectedCountry(country);
  };

  return (
    <>
      <h1>Rest Countries</h1>
      <Search handleSearchChange={handleSearchChange} />
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : showDisplay && selectedCountry ? (
        <Display country={selectedCountry} />
      ) : countries.length === 1 ? (
        <Display country={countries[0]} />
      ) : (
        <Results countries={countries} handleButtonClick={handleButtonClick} />
      )}
    </>
  );
}

export default App;
