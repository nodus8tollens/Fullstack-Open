/* eslint-disable react/prop-types */
import { useState } from "react";
import { getCountry } from "./services/countries";

import Search from "./components/Search";
import Results from "./components/Results";

function App() {
  const [searchString, setSearchString] = useState(null);
  const [countries, setCountries] = useState([]);

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
    console.log(event.target.value);
    getCountry(event.target.value)
      .then((filteredCountries) => {
        console.log("Filtered countries: ", filteredCountries);
        setCountries(filteredCountries);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <h1>Rest Countries</h1>
      <Search handleSearchChange={handleSearchChange} />
      <Results countries={countries} />
    </>
  );
}

export default App;
